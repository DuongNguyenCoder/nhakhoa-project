import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { NavLink } from "../../provider/react-router-dom";

const menu = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Banner", path: "/admin/banner" },
  {
    label: "Sản phẩm",
    children: [
      { label: "Danh sách sản phẩm", path: "/admin/product" },
      { label: "Danh mục", path: "/admin/directory" },
      { label: "Phân mục", path: "/admin/category" },
    ],
  },
  { label: "Đối tác", path: "/admin/partner" },
  {
    label: "Tin tức",
    children: [
      { label: "Loại tin tức", path: "/admin/news/category" },
      { label: "Danh sách tin tức", path: "/admin/news" },
    ],
  },
  { label: "Bảo hành", path: "/admin/warranty" },
  { label: "Đơn hàng", path: "/admin/orders" },
  { label: "Thanh Tiêu Đề Phụ", path: "/admin/methods" },
  { label: "Người dùng", path: "/admin/users" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white h-full flex flex-col shadow-xl">
      <div className="p-5 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">⚙️ Quản trị</h2>
        <nav className="space-y-3">
          {menu.map((item, idx) => (
            <div key={idx}>
              {item.children ? (
                <div>
                  <p className="font-semibold text-slate-300">{item.label}</p>
                  <div className="ml-3 space-y-2">
                    {item.children.map((child, subIdx) => (
                      <NavLink
                        key={subIdx}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg transition-colors duration-300 ${
                            isActive
                              ? "bg-slate-700 text-white font-semibold"
                              : "hover:bg-slate-800 text-slate-300"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? "bg-slate-700 text-white font-semibold"
                        : "hover:bg-slate-800 text-slate-300"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <NavLink
          to="/admin/signup"
          className="flex w-full gap-2 items-center text-center rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 transition duration-300"
        >
          <Cog8ToothIcon className="size-5" />
          Đăng ký tài khoản
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
