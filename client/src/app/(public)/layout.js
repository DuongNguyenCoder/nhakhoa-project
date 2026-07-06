import SupportWidget from "@/components/SupportWidget";
import Footer from "../../components/layout/Footer";
import MainHeader from "../../components/layout/MainHeader";
import MenuHeader from "../../components/layout/MenuHeader";
import ScrollToTop from "../../components/ScrollToTop";
import TopHeader from "../../components/layout/TopHeader";
import PopupRenderer from "@/utils/popupRenderer";

export const metadata = {
  title: "Minh Dental",
  description: "Minh Dental client",
};

export default function PublicLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      <TopHeader />
      <MainHeader />
      <div className="sticky top-0 z-50 bg-white shadow">
        <MenuHeader />
      </div>

      <main className="pb-16">{children}</main>
      <SupportWidget />
      <PopupRenderer />
      <Footer />
    </>
  );
}
