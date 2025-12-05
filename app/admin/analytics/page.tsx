"use client";

import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-sm text-gray-500">Overview of your store performance</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Sales", value: "$12,345", change: "+12%", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
                    { title: "Total Orders", value: "1,234", change: "+5%", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-100" },
                    { title: "New Customers", value: "123", change: "+18%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
                    { title: "Avg. Order Value", value: "$45", change: "+2%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-xs font-medium text-green-600">{stat.change}</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Placeholder */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 font-semibold text-gray-900">Revenue Over Time</h3>
                    <div className="flex h-64 items-end justify-between gap-2">
                        {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90, 60, 95].map((h, i) => (
                            <div key={i} className="w-full rounded-t bg-orange-100 hover:bg-orange-200" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-gray-500">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 font-semibold text-gray-900">Sales by Category</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Electronics", value: 75, color: "bg-blue-500" },
                            { label: "Fashion", value: 60, color: "bg-pink-500" },
                            { label: "Grocery", value: 45, color: "bg-green-500" },
                            { label: "Home & Living", value: 30, color: "bg-orange-500" },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                    <span className="text-gray-500">{item.value}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
