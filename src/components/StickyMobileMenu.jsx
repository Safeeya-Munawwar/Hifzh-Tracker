import { Home, BookOpen, Target, History, User } from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Quran",
    path: "/quran",
    icon: BookOpen,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: Target,
  },
  {
    name: "Revision",
    path: "/revision",
    icon: History,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default function StickyMobileMenu() {
  return (
    <div
      className="
  fixed
  bottom-4
  left-4
  right-4
  z-50
  lg:hidden
  bg-white/90
  backdrop-blur-xl
  border
  border-green-100
  shadow-xl
  rounded-3xl
  px-3 py-3
  flex justify-around
  "
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
  flex flex-col
  items-center
  text-xs
  gap-1
  
  ${isActive ? "text-green-700" : "text-slate-500"}
  
  `
            }
          >
            <Icon size={21} />

            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
