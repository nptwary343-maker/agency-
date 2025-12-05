"use client";

import { useRef } from "react";
import {
    Shirt,
    ShoppingBasket,
    Smartphone,
    Pill,
    Wrench,
    Globe,
    Code,
    Cpu
} from "lucide-react";
import Link from "next/link";

const categories = [
    { id: "fashion", name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
    { id: "grocery", name: "Grocery", icon: ShoppingBasket, color: "bg-green-100 text-green-600" },
    { id: "gadget", name: "Gadget", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
    { id: "medicine", name: "Medicine", icon: Pill, color: "bg-red-100 text-red-600" },
    { id: "services", name: "Services", icon: Wrench, color: "bg-orange-100 text-orange-600" },
    { id: "imported", name: "Imported", icon: Globe, color: "bg-purple-100 text-purple-600" },
    { id: "software", name: "Software", icon: Code, color: "bg-gray-100 text-gray-600" },
    { id: "electronics", name: "Electronics", icon: Cpu, color: "bg-yellow-100 text-yellow-600" },
];

export function CategoryStrip() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full bg-white py-4 shadow-sm">
            <div
                ref={scrollRef}
                className="flex w-full gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.id}`}
                            className="flex min-w-[72px] flex-col items-center gap-2"
                        >
                            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${cat.color} transition-transform hover:scale-110`}>
                                <Icon size={24} />
                            </div>
                            <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
