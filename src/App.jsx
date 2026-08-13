import { Route, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "./lib/authStore";

// common
import AppToast from "./common/AppToast";
import ScrollToTop from "./common/ScrollToTop";
import ScrollToTopButton from "./common/ScrollToTopButton";
import AnimatedRoutes from "./common/AnimatedRoutes";

// layouts
import MainLayout from "./layouts/MainLayout";
import FullPageLayout from "./layouts/FullPageLayout";
import PageWithNavbar from "./layouts/PageWithNavbar";

// user
import NotFound from "./pages/NotFound";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import QuranTracker from "./pages/quran-tracker/QuranTracker";
import Goal from "./pages/goal/Goal";
import Revision from "./pages/revision/Revision";
import Achievements from "./pages/achievements/Achievements";

export default function App() {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const location = useLocation();

  if (!isHydrated) {
    return (
      <div>
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <AppToast />
      <ScrollToTop />

      <AnimatedRoutes location={location}>
        {/* MAIN SITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/quran-tracker" element={<QuranTracker />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/achievements" element={<Achievements />} />
        </Route>

        {/* PROFILE (PROTECTED) */}
        <Route element={<PageWithNavbar />}>

        </Route>

        {/* AUTH */}
        <Route element={<FullPageLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </AnimatedRoutes>

      <ScrollToTopButton />
    </div>
  );
}
