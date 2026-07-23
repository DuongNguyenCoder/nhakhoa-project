"use client";

// import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/routes/AdminRoute";
// import { OutletProvider } from "@/provider/react-router-dom";
import Sidebar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";

export default function Layout({ children }) {
  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-slate-100">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-white">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="ml-64 flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b bg-white">
            <Header />
          </header>

          {/* Content */}
          <section className="flex-1 p-6">{children}</section>
        </main>
      </div>
    </AdminRoute>
  );
}
