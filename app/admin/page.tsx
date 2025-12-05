import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp
} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
        color: "bg-green-500",
    },
    {
        title: "Active Orders",
        value: "+573",
        change: "+201 since last hour",
        icon: ShoppingBag,
        color: "bg-blue-500",
    },
    {
        title: "Active Customers",
        value: "2,345",
        change: "+180 new users",
        icon: Users,
        color: "bg-orange-500",
    },
    {
        title: "Growth Rate",
        value: "+12.5%",
        change: "+4.3% from last week",
        icon: TrendingUp,
        color: "bg-purple-500",
    },
];

export default function AdminDashboard() {
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
                            <p className="mt-4 text-xs font-medium text-green-600">{stat.change}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <div className="mt-4 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Order #{1000 + i}</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    Completed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
                    <div className="mt-4 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Product Name {i}</p>
                                        <p className="text-xs text-gray-500">124 sales</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-gray-900">$49.99</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
