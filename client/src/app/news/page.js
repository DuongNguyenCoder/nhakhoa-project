"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import News from "@/components/pages/News";
import RouterLayout from "@/provider/RouterLayout";
import dynamic from "next/dynamic";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <News />
    </RouterLayout>
  );
}
