"use client";

import { Home, Layers, ShoppingCart, User, PlaySquare, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/feed", label: "Feed", icon: Zap },
    { href: "/shorts", label: "Shorts", icon: PlaySquare },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-gray-200 bg-white pb-safe pt-2 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors ${isActive ? "text-orange-600" : "text-gray-500 hover:text-orange-600"
                }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
