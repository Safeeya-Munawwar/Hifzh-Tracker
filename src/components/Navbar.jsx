import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Target,
  History,
  Trophy,
  Info,
  MessageCircle,
} from "lucide-react";
import logo from "../assets/logo/logo-green.png";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Quran Tracker",
    path: "/quran-tracker",
    icon: BookOpen,
  },
  {
    name: "Goals",
    path: "/goal",
    icon: Target,
  },
  {
    name: "Revision",
    path: "/revision",
    icon: History,
  },
  {
    name: "Achievements",
    path: "/achievements",
    icon: Trophy,
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: MessageCircle,
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-lg"
      style={{
        background: "rgba(255,255,255,.96)",
        borderColor: "var(--color-primary-border)",
      }}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Hifzh Journey" className="h-35 w-auto" />
        </NavLink>

        {/* Desktop */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive ? "shadow-md" : "hover:-translate-y-0.5"
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive
                    ? "var(--color-primary-light)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--text-secondary)",
                })}
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl transition lg:hidden"
          style={{
            background: "var(--bg-secondary)",
            color: "var(--color-primary)",
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="border-t lg:hidden"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--color-primary-border)",
          }}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive ? "" : "hover:translate-x-1"
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive
                      ? "var(--color-primary-light)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--text-secondary)",
                  })}
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
