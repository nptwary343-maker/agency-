"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getAdminStats() {
    const [
        totalRevenueResult,
        totalOrders,
        activeCustomers,
        recentOrders,
        lowStockProducts
    ] = await Promise.all([
        // Total Revenue (sum of all completed/delivered orders)
        prisma.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                status: {
                    not: "CANCELLED" // Simplified revenue calculation
                }
            }
        }),

        // Active Orders (Pending/Processing/Out for Delivery)
        prisma.order.count({
            where: {
                status: {
                    in: ["PENDING", "PROCESSING", "OUT_FOR_DELIVERY", "CONFIRMED"]
                }
            }
        }),

        // Active Customers (Total users with role CUSTOMER)
        prisma.user.count({
            where: {
                role: "CUSTOMER"
            }
        }),

        // Recent Orders
        prisma.order.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        items: true
                    }
                }
            }
        }),

        // Low Stock Products (instead of 'Top Products' for now, efficiently runnable)
        prisma.product.findMany({
            take: 5,
            where: {
                stock_quantity: {
                    lte: 10
                }
            },
            orderBy: {
                stock_quantity: "asc"
            }
        })
    ]);

    return {
        revenue: totalRevenueResult._sum.totalAmount || 0,
        activeOrders: totalOrders,
        customers: activeCustomers,
        recentOrders,
        lowStockProducts
    };
}

export async function getCustomers() {
    const users = await prisma.user.findMany({
        where: {
            role: "CUSTOMER",
        },
        include: {
            _count: {
                select: { orders: true },
            },
            orders: {
                where: {
                    status: { not: "CANCELLED" }
                },
                select: {
                    totalAmount: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return users.map((user) => {
        const totalSpent = user.orders.reduce((acc, order) => acc + order.totalAmount, 0);
        return {
            id: user.id,
            name: user.name || "Unknown",
            email: user.email,
            phone: "N/A", // User model doesn't have phone yet, leaving as N/A or we should update schema
            orders: user._count.orders,
            totalSpent,
            status: "Active", // Default status for now
            joinDate: user.createdAt.toISOString().split("T")[0],
            role: user.role
        };
    });
}
