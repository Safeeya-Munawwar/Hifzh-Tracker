import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import { FloatingButtonsProvider } from "./common/FloatingButtonContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <FloatingButtonsProvider>
          <App />
        </FloatingButtonsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);