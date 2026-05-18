"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Contact from "@/pages/Contact";
import RouterLayout from "@/next/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <Contact />
    </RouterLayout>
  );
}
