"use client";

import ProductLayout from "@/layout/ProductLayout";
import RouterLayout from "@/next/RouterLayout";

export default function Layout({ children }) {
  return <RouterLayout layout={ProductLayout}>{children}</RouterLayout>;
}
