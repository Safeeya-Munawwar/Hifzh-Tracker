import React, { useEffect } from "react";
import { X, Filter } from "lucide-react";

export default function AdminFilterMenu({
  isOpen,
  onClose,
  title = "Filter Users",
  children,
}) {
  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[9998]
          bg-black/40
          backdrop-blur-sm
          transition-all
          duration-300

          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* PANEL */}

      <div
        className={`
          fixed
          top-0
          right-0
          h-full
          w-[320px]
          sm:w-[360px]

          z-[9999]

          flex
          flex-col

          shadow-[0_20px_60px_rgba(0,0,0,0.25)]

          transition-transform
          duration-300
          ease-in-out

          border-l
          theme-border

          bg-[var(--card-bg)]

          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            px-6
            py-5

            border-b
            theme-border

            bg-[var(--bg-secondary)]

            sticky
            top-0
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-9
                h-9
                rounded-xl

                bg-[var(--color-primary-light)]

                border
                theme-border

                flex
                items-center
                justify-center
              "
            >
              <Filter
                className="
                  w-4
                  h-4
                  text-[var(--color-primary)]
                "
              />
            </div>

            <h2
              className="
                text-[15px]
                font-semibold

                text-[var(--text-color)]

                tracking-[1px]
              "
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              w-9
              h-9

              rounded-xl

              flex
              items-center
              justify-center

              hover:bg-[var(--color-primary-light)]

              transition
            "
          >
            <X size={20} className="theme-muted" />
          </button>
        </div>

        {/* CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto

            p-6

            bg-[var(--card-bg)]
          "
        >
          {children}
        </div>
      </div>
    </>
  );
}
