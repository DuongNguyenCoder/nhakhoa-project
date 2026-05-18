"use client";

import HomeLayout from "@/layout/HomeLayout";
import Home from "@/components/home/Home";
import RouterLayout from "@/next/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={HomeLayout}>
      <Home />
    </RouterLayout>
  );
}
