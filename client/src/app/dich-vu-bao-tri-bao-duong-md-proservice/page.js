import DentalSOSPopup from "./components/popup/DentalSOSPopup";
import HeroSection from "./components/HeroSection";
import SectionMaintenance from "./components/SectionMaintenance";
import SectionMaintenancePackage from "./components/SectionMaintenancePackage";
import Section5Process from "./components/SectionProcess";
import ServiceSection from "./components/ServiceSection";
import VideoComponent from "./components/VideoComponent";
import { PopupProvider } from "./components/popup/PopupProvider";
import FloatingSidebar from "./components/sidebar/FloatingSidebar";

export default function Page() {
  return (
    <PopupProvider>
      <FloatingSidebar />

      <main className="flex-1 relative px-4 md:px-10">
        <HeroSection />
        <VideoComponent />
        <SectionMaintenance />
        <Section5Process />
        <SectionMaintenancePackage />
        <ServiceSection />
      </main>
    </PopupProvider>
  );
}
