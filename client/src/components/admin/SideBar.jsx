import { NavLink } from "../../provider/react-router-dom";
import {
  Home,
  Image,
  Package,
  Layers,
  Users,
  FileText,
  ShieldCheck,
  ShoppingCart,
  User,
  Settings,
  Tag,
} from "lucide-react";

const menu = [
  { label: "Dashboard", path: "/admin/dashboard", Icon: Home },
  { label: "Banner", path: "/admin/banner", Icon: Image },
  { label: "Danh sách sản phẩm", path: "/admin/product", Icon: Package },
  { label: "Danh mục sản phẩm", path: "/admin/directory", Icon: Layers },
  { label: "Đối tác", path: "/admin/partner", Icon: Users },
  { label: "Loại tin tức", path: "/admin/news/category", Icon: Tag },
  { label: "Danh sách tin tức", path: "/admin/news", Icon: FileText },
  { label: "Bảo hành", path: "/admin/warranty", Icon: ShieldCheck },
  { label: "Đơn hàng", path: "/admin/orders", Icon: ShoppingCart },
  { label: "Thanh Tiêu Đề Phụ", path: "/admin/methods", Icon: Settings },
  { label: "Người dùng", path: "/admin/users", Icon: User },
];

const Sidebar = () => {
  return (
    <aside
      className="w-64 bg-white text-slate-800 h-full flex flex-col border-r"
      aria-label="Admin sidebar"
    >
      <div className="p-5 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 tracking-wide flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-md bg-[#9c1d22] text-white flex items-center justify-center">
            ⚙️
          </span>
          Minh Dental
        </h2>

        <nav className="space-y-1">
          {menu.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                    isActive
                      ? "bg-[#9c1d22]/90 text-white font-semibold shadow-inner border-l-4 border-[#7e1417]"
                      : "text-slate-600 hover:bg-[#fdecea] hover:text-[#9c1d22]"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <NavLink
          to="/admin/signup"
          className="flex w-full gap-2 items-center justify-center rounded bg-[#9c1d22] px-4 py-2 font-semibold text-white hover:bg-[#7e1417] transition"
        >
          <Settings className="w-5 h-5" />
          Đăng ký tài khoản
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
