"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye
} from "lucide-react";
import Link from "next/link";

// Mock data for development - this would come from your API/Database
const mockProducts = [
    {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 49.99,
        stock: 124,
        status: "In Stock",
        image: "https://picsum.photos/seed/1/50",
    },
    {
        id: "2",
        name: "Smart Watch Series 7",
        category: "Gadget",
        price: 199.00,
        stock: 45,
        status: "Low Stock",
        image: "https://picsum.photos/seed/2/50",
    },
    {
        id: "3",
        name: "Premium Cotton Panjabi",
        category: "Fashion",
        price: 25.00,
        stock: 0,
        status: "Out of Stock",
        image: "https://picsum.photos/seed/5/50",
    },
    {
        id: "4",
        name: "Gaming Mouse RGB",
        category: "Electronics",
        price: 25.50,
        stock: 89,
        status: "In Stock",
        image: "https://picsum.photos/seed/3/50",
    },
    {
        id: "5",
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 89.99,
        stock: 32,
        status: "In Stock",
        image: "https://picsum.photos/seed/4/50",
    },
];

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-sm text-gray-500">Manage your product inventory</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter size={20} />
                    Filters
                </button>
            </div>

            {/* Products Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                                    <td className="px-6 py-4 text-gray-600">{product.stock} units</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === "In Stock"
                                                    ? "bg-green-100 text-green-800"
                                                    : product.status === "Low Stock"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                                <Eye size={18} />
                                            </button>
                                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                                                <Edit size={18} />
                                            </button>
                                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                    <p className="text-sm text-gray-500">Showing 1-5 of 24 products</p>
                    <div className="flex gap-2">
                        <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                            Previous
                        </button>
                        <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
