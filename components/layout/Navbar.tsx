"use client";

import { Menu, Search, ShoppingCart, User, QrCode, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

type NavbarProps = {
  cartCount?: number;
};

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Mobile menu trigger + Logo */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Open menu"
                onClick={handleOpenMobileMenu}
                className="inline-flex rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 md:hidden"
              >
                <Menu size={22} />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 text-2xl font-bold text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                aria-label="Home"
              >
                Asthar Hat
              </Link>
            </div>

            {/* Center: Search Bar (Hidden on small mobile, visible on larger screens) */}
            <div className="hidden max-w-xl flex-1 md:block">
              <form role="search" action="/search" className="relative">
                <label htmlFor="desktop-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="desktop-search"
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pl-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
              </form>
            </div>

            {/* Right: Actions */}
            <nav aria-label="Primary actions" className="flex items-center gap-3 sm:gap-4">
              {/* QR Code (Mobile/Desktop) */}
              <button
                type="button"
                aria-label="Open QR scanner"
                className="rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <QrCode size={22} />
              </button>

              {/* Notifications */}
              <button
                type="button"
                aria-label="Open notifications"
                className="relative rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <Bell size={22} />
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500"
                >
                  <span
                    aria-hidden="true"
                    className="h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
                  ></span>
                </span>
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Cart, ${cartCount} items`}
                className="relative flex items-center rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                <ShoppingCart size={22} />
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white"
                >
                  {cartCount}
                </span>
              </Link>

              {/* Settings (Dropdown trigger in real app) */}
              <button
                type="button"
                aria-label="Open settings"
                className="hidden rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:block"
              >
                <Settings size={22} />
              </button>

              {/* Profile (Desktop) */}
              <Link
                href="/profile"
                aria-label="Profile"
                className="hidden items-center rounded-md p-2 text-gray-600 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 md:flex"
              >
                <User size={22} />
              </Link>
            </nav>
          </div>

          {/* Mobile Search Bar (Visible only on mobile, below header) */}
          <div className="pb-3 md:hidden">
            <form role="search" action="/search" className="relative">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-search"
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                aria-hidden="true"
              />
            </form>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
