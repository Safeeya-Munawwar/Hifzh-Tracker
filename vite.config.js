import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Hifzh Tracker",
        short_name: "Hifzh",
        description:
          "Track Quran memorization and revision journey",

        theme_color: "#166534",

        background_color: "#ffffff",

        display: "standalone",

        icons: [
          {
            src: "/logo-green.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});