import SideBarNews from "@/components/admin/sidebar-layout-news-page";
import SideBarDiscount from "@/components/SideBarDiscount";

export default function NewsLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[1350px] grid grid-cols-1 lg:grid-cols-5 py-14 gap-4 px-4">
      <div className="my-5 lg:col-span-4 w-full px-4 border border-gray-100 rounded-xl shadow-md">
        {children}
      </div>

      <aside className="mt-6 lg:col-span-1 w-full px-2 lg:mt-5">
        <SideBarNews />
        <SideBarDiscount />
      </aside>
    </div>
  );
}
