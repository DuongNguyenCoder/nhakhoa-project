import SideBarDiscount from "@/components/SideBarDiscount";
import ProductSlider from "@/components/ui/ProductSlider";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-linear-to-b from-gray-100 via-gray-50 to-white/70">
      <div className="max-w-7xl mx-auto w-full px-4 pt-8 space-y-8">
        <ProductSlider title="SẢN PHẨM NỔI BẬT - HOT DEAL" />

        {/* Main Content + Sidebar */}
        <div className="my-5 w-full mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
          <section id="content" className="w-full p-2 lg:col-span-3">
            {children}
          </section>
          <aside className="mt-6 lg:col-span-1 w-full px-2 lg:-mt-2.5">
            <SideBarDiscount />
          </aside>
        </div>
      </div>
    </div>
  );
}
