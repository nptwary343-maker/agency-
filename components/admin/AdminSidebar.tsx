"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    Truck,
    BarChart3,
    Layers,
    LogOut
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Layers,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Delivery",
        href: "/admin/delivery",
        icon: Truck,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform">
            <div className="flex h-full flex-col">
                {/* Logo Area */}
                <div className="flex h-16 items-center border-b border-gray-200 px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white">
                            A
                        </div>
                        <span>Asthar Admin</span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                ? "bg-orange-50 text-orange-600"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* User Profile / Logout */}
                <div className="border-t border-gray-200 p-4">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
