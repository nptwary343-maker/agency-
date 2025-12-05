import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="ml-64 min-h-screen">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
                    <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <span className="text-sm font-medium text-gray-700">Super Admin</span>
                    </div>
                </header>
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
