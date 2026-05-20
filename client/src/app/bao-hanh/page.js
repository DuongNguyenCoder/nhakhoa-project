"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import BaoHanh from "@/components/pages/BaoHanh";
import RouterLayout from "@/provider/RouterLayout";

export default function Page() {
  return (
    <RouterLayout layout={DefaultLayout}>
      <BaoHanh />
    </RouterLayout>
  );
}
