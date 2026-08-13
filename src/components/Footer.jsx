import { Link } from "react-router-dom";
import { Mail, MessageCircle, Heart } from "lucide-react";

import logo from "../assets/logo/logo-white.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const email = import.meta.env.VITE_APP_EMAIL;
  const phone = import.meta.env.VITE_APP_NUMBER?.replace(/\D/g, "");

  const whatsappMessage = `Assalamu Alaikum,

I would like to know more about Hifzh Tracker.`;

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  return (
    <footer className="mt-auto bg-[#052e16] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div
          className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-8
        "
        >
          {/* LEFT BRAND */}
          <div className="flex items-center gap-5">
            <Link to="/" className="hover:opacity-90 transition">
              <img
                src={logo}
                alt="Hifzh Tracker"
                className="h-35 w-auto object-contain"
              />
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="
            flex flex-col
            items-center md:items-end
            gap-5
            pr-6
          "
          >
            {/* CONTACT ICONS */}
            <div className="flex gap-3">
              <button
                onClick={openWhatsApp}
                className="
                  h-11 w-11
                  rounded-full
                  bg-white/10
                  hover:bg-green-600
                  text-white
                  flex items-center justify-center
                  transition-all duration-300
                "
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </button>

              <a
                href={`mailto:${email}`}
                className="
                  h-11 w-11
                  rounded-full
                  bg-white/10
                  hover:bg-green-600
                  text-white
                  flex items-center justify-center
                  transition-all duration-300
                "
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            {/* COPYRIGHT */}
            <div
              className="
              flex flex-col sm:flex-row
              items-center
              gap-3
              text-sm
              text-green-100/60
            "
            >
              <p>© {currentYear} Hifzh Tracker. All rights reserved.</p>

              <span className="hidden sm:block">•</span>

              <p className="flex items-center gap-1">
                Built with
                <Heart size={14} className="text-red-400 fill-red-400" />
                for Quran learners
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
