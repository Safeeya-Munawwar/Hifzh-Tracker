import { useEffect, useMemo, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setIsVisible(y > 240);

        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || y;
        const scrollHeight = (doc.scrollHeight || 1) - (doc.clientHeight || 1);
        const p =
          scrollHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
            : 0;
        setProgress(p);

        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const ring = useMemo(() => {
    const r = 20; // Slightly larger radius for a more premium look
    const c = 2 * Math.PI * r;
    const dash = c * progress;
    const gap = c - dash;
    return { r, c, dasharray: `${dash} ${gap}` };
  }, [progress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={[
        "fixed bottom-20 xl:bottom-6 right-6 z-50",
        "h-12 w-12 rounded-full",
        "border backdrop-blur-md",
        "shadow-lg",
        "grid place-items-center",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "active:translate-y-0 active:scale-[0.95]",
        "focus:outline-none focus:ring-4",

        // THEME BASED COLORS
        "bg-[var(--bg-color)] border-[var(--color-primary-border)]",
        "shadow-[0_10px_25px_rgba(0,0,0,0.08)]",
        "focus:ring-[var(--color-primary-border)]",

        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      {/* progress ring */}
      <span className="absolute inset-0 grid place-items-center pointer-events-none">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="opacity-100 -rotate-90"
        >
          {/* track */}
          <circle
            cx="24"
            cy="24"
            r={ring.r}
            fill="none"
            className="stroke-[var(--color-primary-border)] opacity-40"
            strokeWidth="3"
          />
          {/* progress */}
          <circle
            cx="24"
            cy="24"
            r={ring.r}
            fill="none"
            className="stroke-[var(--color-primary)] transition-all duration-300 ease-out"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ring.dasharray}
          />
        </svg>
      </span>

      {/* icon */}
      <span className="relative">
        <FiArrowUp
          className="text-[var(--color-primary)] transition-transform duration-300"
          size={20}
        />
      </span>
    </button>
  );
}
