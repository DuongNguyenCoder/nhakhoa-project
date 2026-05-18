"use client";

import ProductLayout from "@/layout/ProductLayout";
import RouterLayout from "@/provider/RouterLayout";

export default function Layout({ children }) {
  return <RouterLayout layout={ProductLayout}>{children}</RouterLayout>;
}
