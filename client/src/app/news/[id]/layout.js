import RouterLayout from "@/next/RouterLayout";

export default function Layout({ children }) {
  return <RouterLayout layout={DefaultLayout}>{children}</RouterLayout>;
}
