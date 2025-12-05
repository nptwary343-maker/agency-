"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Eye,
    MoreVertical,
    CheckCircle,
    Clock,
    Truck,
    XCircle
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        date: "2024-03-10",
        total: 124.50,
        status: "Pending",
        items: 3,
    },
    {
        id: "ORD-002",
        customer: "Sarah Smith",
        date: "2024-03-09",
        total: 450.00,
        status: "Processing",
        items: 1,
    },
    {
        id: "ORD-003",
        customer: "Mike Johnson",
        date: "2024-03-09",
        total: 35.00,
        status: "Delivered",
        items: 2,
    },
    {
        id: "ORD-004",
        customer: "Emily Davis",
        date: "2024-03-08",
        total: 89.99,
        status: "Cancelled",
        items: 1,
    },
    {
        id: "ORD-005",
        customer: "Alex Wilson",
        date: "2024-03-08",
        total: 210.50,
        status: "Out for Delivery",
        items: 4,
    },
];

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending": return "bg-yellow-100 text-yellow-800";
        case "processing": return "bg-blue-100 text-blue-800";
        case "delivered": return "bg-green-100 text-green-800";
        case "cancelled": return "bg-red-100 text-red-800";
        case "out for delivery": return "bg-purple-100 text-purple-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending": return Clock;
        case "processing": return Clock;
        case "delivered": return CheckCircle;
        case "cancelled": return XCircle;
        case "out for delivery": return Truck;
        default: return Clock;
    }
};

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-sm text-gray-500">Manage and track customer orders</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter size={20} />
                    Filter Status
                </button>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Items</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockOrders.map((order) => {
                                const StatusIcon = getStatusIcon(order.status);
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <Link href={`/admin/orders/${order.id}`} className="hover:text-orange-600 hover:underline">
                                                {order.id}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.items} items</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                                                <StatusIcon size={14} />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
