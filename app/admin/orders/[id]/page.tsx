"use client";

import {
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    Printer,
    Truck,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/orders"
                        className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{orderId}</h1>
                        <p className="text-sm text-gray-500">Placed on March 10, 2024 at 10:30 AM</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Printer size={18} />
                        Print Invoice
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
                        <Truck size={18} />
                        Assign Rider
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Order Items */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Items</h3>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={`https://picsum.photos/seed/${i}/100`}
                                                alt="Product"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Product Name {i}</h4>
                                            <p className="text-sm text-gray-500">Variant: Black, XL</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">$49.99</p>
                                        <p className="text-sm text-gray-500">Qty: 1</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t border-gray-100 pt-4">
                            <div className="flex justify-between py-2 text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>$149.97</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm text-gray-600">
                                <span>Delivery Fee</span>
                                <span>$5.00</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm text-gray-600">
                                <span>Tax</span>
                                <span>$15.00</span>
                            </div>
                            <div className="mt-2 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>$169.97</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Timeline</h3>
                        <div className="relative space-y-6 pl-4 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-white"></span>
                                <h4 className="font-medium text-gray-900">Order Placed</h4>
                                <p className="text-sm text-gray-500">March 10, 2024 - 10:30 AM</p>
                            </div>
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white"></span>
                                <h4 className="font-medium text-gray-900">Processing</h4>
                                <p className="text-sm text-gray-500">March 10, 2024 - 11:15 AM</p>
                            </div>
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></span>
                                <h4 className="font-medium text-gray-500">Out for Delivery</h4>
                                <p className="text-sm text-gray-400">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Customer</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div>
                                <p className="font-medium text-gray-900">John Doe</p>
                                <p className="text-sm text-gray-500">Customer since 2023</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail size={16} />
                                <a href="mailto:john@example.com" className="hover:text-orange-600">john@example.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone size={16} />
                                <a href="tel:+1234567890" className="hover:text-orange-600">+1 234 567 890</a>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Delivery Address</h3>
                        <div className="flex gap-3">
                            <MapPin className="mt-1 shrink-0 text-gray-400" size={20} />
                            <p className="text-sm leading-relaxed text-gray-600">
                                123 Main Street, Apt 4B<br />
                                Dhaka, Bangladesh 1212
                            </p>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Update Status</h3>
                        <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="out-for-delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button className="mt-4 w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
