"use client";

import { X, Home, ShoppingBag, User, List } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-xl font-bold text-orange-600">Asthar Hat</span>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={onClose}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={onClose}
                >
                  <List size={20} />
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={onClose}
                >
                  <ShoppingBag size={20} />
                  <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={onClose}
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
