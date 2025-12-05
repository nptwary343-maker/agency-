"use client";

import { MapPin, Truck, Phone } from "lucide-react";

// Mock data
const activeDeliveries = [
    {
        id: "DEL-001",
        rider: "Rider Mike",
        orderId: "ORD-005",
        customer: "Alex Wilson",
        address: "123 Main St, Dhaka",
        status: "On the way",
        location: "Gulshan 1",
        time: "15 mins away",
    },
    {
        id: "DEL-002",
        rider: "Rider Sarah",
        orderId: "ORD-008",
        customer: "Lisa Ray",
        address: "45 Park Rd, Dhaka",
        status: "Picked up",
        location: "Banani",
        time: "30 mins away",
    },
];

export default function DeliveryPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
                    <p className="text-sm text-gray-500">Track active deliveries and riders</p>
                </div>
                <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
                    Add New Rider
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Active Deliveries List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-semibold text-gray-900">Active Deliveries</h3>
                    <div className="grid gap-4">
                        {activeDeliveries.map((delivery) => (
                            <div key={delivery.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{delivery.rider}</h4>
                                            <p className="text-sm text-gray-500">Order #{delivery.orderId}</p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                        {delivery.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 shrink-0 text-gray-400" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Destination</p>
                                            <p className="text-sm text-gray-600">{delivery.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Truck className="mt-0.5 shrink-0 text-gray-400" size={18} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Current Location</p>
                                            <p className="text-sm text-gray-600">{delivery.location}</p>
                                            <p className="text-xs text-green-600">{delivery.time}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <Phone size={16} />
                                        Call Rider
                                    </button>
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <MapPin size={16} />
                                        Track Live
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rider Stats */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold text-gray-900">Delivery Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">Total Riders</span>
                                <span className="font-bold text-gray-900">12</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">Active Now</span>
                                <span className="font-bold text-green-600">8</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">Completed Today</span>
                                <span className="font-bold text-gray-900">45</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
