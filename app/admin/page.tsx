import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    AlertTriangle
} from "lucide-react";
import { getAdminStats } from "./actions";

export default async function AdminDashboard() {
    const data = await getAdminStats();

    const stats = [
        {
            title: "Total Revenue",
            value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.revenue),
            // change: "+20.1% from last month", // TODO: Implement growth calculation
            change: "Lifetime Revenue",
            icon: DollarSign,
            color: "bg-green-500",
        },
        {
            title: "Active Orders",
            value: data.activeOrders.toString(),
            change: "Pending & Processing",
            icon: ShoppingBag,
            color: "bg-blue-500",
        },
        {
            title: "Total Customers",
            value: data.customers.toString(),
            change: "Registered Users",
            icon: Users,
            color: "bg-orange-500",
        },
        {
            title: "Growth Rate",
            value: "+0.0%", // Placeholder
            change: "Not available yet",
            icon: TrendingUp,
            color: "bg-purple-500",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</h3>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white shadow-lg`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                            <p className="mt-4 text-xs font-medium text-gray-500">{stat.change}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <div className="mt-4 space-y-4">
                        {data.recentOrders.length === 0 ? (
                            <p className="text-sm text-gray-500">No orders found.</p>
                        ) : (
                            data.recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                                            {order.user.name ? order.user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Order #{order.id.slice(0, 8)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalAmount)}
                                        </p>
                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium 
                                             ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">Low Stock Alert</h3>
                    <div className="mt-4 space-y-4">
                        {data.lowStockProducts.length === 0 ? (
                            <p className="text-sm text-gray-500">No low stock products.</p>
                        ) : (
                            data.lowStockProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                            <AlertTriangle size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{product.title}</p>
                                            <p className="text-xs text-gray-500">Stock: {product.stock_quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
