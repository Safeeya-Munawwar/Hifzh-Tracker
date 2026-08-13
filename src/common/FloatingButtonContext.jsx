import { createContext, useContext, useState, useEffect } from "react";

const FloatingButtonsContext = createContext();

export function FloatingButtonsProvider({ children }) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <FloatingButtonsContext.Provider
      value={{
        isWhatsAppOpen,
        setIsWhatsAppOpen,
        scrollY,
      }}
    >
      {children}
    </FloatingButtonsContext.Provider>
  );
}

export const useFloatingButtons = () => useContext(FloatingButtonsContext);
