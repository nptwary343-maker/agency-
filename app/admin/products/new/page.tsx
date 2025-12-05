"use client";

import { useState } from "react";
import {
    ArrowLeft,
    Upload,
    Plus,
    X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Mock upload - in real app, upload to S3/Cloudinary
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImages([...images, url]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        router.push("/admin/products");
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                    <p className="text-sm text-gray-500">Create a new product for your store</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Basic Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="e.g. Wireless Headphones"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Product description..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Media</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {images.map((url, idx) => (
                                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                                    <img src={url} alt="Preview" className="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50">
                                <Upload className="mb-2 text-gray-400" size={24} />
                                <span className="text-xs font-medium text-gray-500">Upload Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Pricing</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                                    Base Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        step="0.01"
                                        required
                                        className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="discount" className="mb-1 block text-sm font-medium text-gray-700">
                                    Discount Price (Optional)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="discount"
                                        step="0.01"
                                        className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Organization */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Organization</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="grocery">Grocery</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Inventory</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="sku" className="mb-1 block text-sm font-medium text-gray-700">
                                    SKU (Stock Keeping Unit)
                                </label>
                                <input
                                    type="text"
                                    id="sku"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="e.g. ELEC-001"
                                />
                            </div>

                            <div>
                                <label htmlFor="stock" className="mb-1 block text-sm font-medium text-gray-700">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-3 font-medium text-white transition-colors hover:bg-orange-700 disabled:opacity-70"
                        >
                            {isLoading ? "Saving..." : "Save Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
