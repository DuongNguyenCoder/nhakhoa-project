import "./globals.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import AppProviders from "@/next/AppProviders";

export const metadata = {
  title: "Minh Dental",
  description: "Minh Dental client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
