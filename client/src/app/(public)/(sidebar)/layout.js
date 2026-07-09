import SideBarDiscount from "@/components/SideBarDiscount";

export default function NewsLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
      <div className="my-5 lg:col-span-3 w-full px-4">{children}</div>

      <aside className="mt-6 lg:col-span-1 w-full px-2 lg:mt-5">
        <SideBarDiscount />
      </aside>
    </div>
  );
}
