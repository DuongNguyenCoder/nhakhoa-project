"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import BaoHanh from "@/pages/BaoHanh";
import RouterLayout from "@/next/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <BaoHanh />
    </RouterLayout>
  );
}
