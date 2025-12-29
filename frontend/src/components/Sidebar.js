import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaTruck,
  FaLayerGroup,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBoxes,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt className="mr-4 text-emerald-400 text-2xl" /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen className="mr-4 text-blue-400 text-2xl" /> },
    { name: "Categories", path: "/categories", icon: <FaThList className="mr-4 text-pink-400 text-2xl" /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck className="mr-4 text-yellow-400 text-2xl" /> },
    { name: "Stock", path: "/stock", icon: <FaLayerGroup className="mr-4 text-teal-400 text-2xl" /> },
    { name: "Sales", path: "/sales", icon: <FaChartLine className="mr-4 text-purple-400 text-2xl" /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt className="mr-4 text-orange-400 text-2xl" /> },
    { name: "Users", path: "/users", icon: <FaUsers className="mr-4 text-cyan-400 text-2xl" /> },
    { name: "Settings", path: "/settings", icon: <FaCog className="mr-4 text-gray-400 text-2xl" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#031612] text-white shadow">
        <h1 className="flex items-center text-xl font-bold">
          <FaBoxes className="mr-2 text-emerald-400" />
          Inventory
        </h1>
        <button onClick={() => setOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 w-72 min-h-screen bg-[#031612] text-white p-6 shadow-2xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Logo */}
        <h1 className="text-3xl font-extrabold flex items-center mb-8">
          <FaBoxes className="mr-3 text-emerald-500" />
          Inventory
        </h1>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center text-lg transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          <div className="border-t border-gray-600/40 my-4" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-lg text-red-400 hover:bg-red-500/20 hover:text-white rounded-lg transition"
          >
            <FaSignOutAlt className="mr-4 text-2xl" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
