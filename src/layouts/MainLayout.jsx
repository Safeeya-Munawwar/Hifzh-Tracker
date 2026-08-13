import { Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import WhatsAppFAB from "../common/WhatsAppButton.jsx";

export default function MainLayout() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main
        className="  flex-1
        w-full"
        
      >
        <Outlet />
      </main>

      <WhatsAppFAB />

      <Footer />
    </div>
  );
}
