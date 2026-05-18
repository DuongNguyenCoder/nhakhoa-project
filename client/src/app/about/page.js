"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import About from "@/pages/About";
import RouterLayout from "@/next/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <About />
    </RouterLayout>
  );
}
