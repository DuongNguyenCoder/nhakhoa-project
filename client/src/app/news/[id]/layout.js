import RouterLayout from "@/provider/RouterLayout";

export default function Layout({ children }) {
  return <RouterLayout layout={DefaultLayout}>{children}</RouterLayout>;
}
