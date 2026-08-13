import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PageWithNavbar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full flex-1 mx-auto pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}
