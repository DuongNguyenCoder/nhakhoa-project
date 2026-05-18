import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import AppProviders from "@/provider/AppProviders";

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
