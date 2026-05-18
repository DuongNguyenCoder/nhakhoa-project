import Footer from "./components/layout/footer";
import Header from "./components/layout/header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
