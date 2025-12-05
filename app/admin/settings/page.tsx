"use client";

import { useState } from "react";
import { Save, Upload } from "lucide-react";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Manage your store configuration and preferences</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* General Settings */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">General Information</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="siteName" className="mb-1 block text-sm font-medium text-gray-700">
                                Store Name
                            </label>
                            <input
                                type="text"
                                id="siteName"
                                defaultValue="Asthar Hat"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="supportEmail" className="mb-1 block text-sm font-medium text-gray-700">
                                Support Email
                            </label>
                            <input
                                type="email"
                                id="supportEmail"
                                defaultValue="support@astharhat.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                                Store Description
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                defaultValue="The best place to shop for everything you need."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Branding</h3>
                    <div className="flex items-start gap-6">
                        <div className="h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            {/* Placeholder for logo */}
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                No Logo
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Store Logo</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <Upload size={16} />
                                    Upload New
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Recommended size: 512x512px. Max file size: 2MB.</p>
                        </div>
                    </div>
                </div>

                {/* Payment & Currency */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment & Currency</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="currency" className="mb-1 block text-sm font-medium text-gray-700">
                                Currency
                            </label>
                            <select
                                id="currency"
                                defaultValue="BDT"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="BDT">BDT (৳)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="taxRate" className="mb-1 block text-sm font-medium text-gray-700">
                                Default Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                id="taxRate"
                                defaultValue="5"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700 disabled:opacity-70"
                    >
                        <Save size={20} />
                        {isLoading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
