"use client";

import { OutletProvider } from "./react-router-dom";

export default function RouterLayout({ layout: Layout, children }) {
  return (
    <OutletProvider outlet={children}>
      <Layout />
    </OutletProvider>
  );
}
