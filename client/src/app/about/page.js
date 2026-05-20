"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import About from "@/components/pages/About";
import RouterLayout from "@/provider/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <About />
    </RouterLayout>
  );
}
