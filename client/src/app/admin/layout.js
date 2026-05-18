"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/routes/AdminRoute";
import { OutletProvider } from "@/provider/react-router-dom";

export default function Layout({ children }) {
  return (
    <OutletProvider outlet={children}>
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    </OutletProvider>
  );
}
