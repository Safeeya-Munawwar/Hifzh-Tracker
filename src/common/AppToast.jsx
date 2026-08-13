import { Toaster } from "react-hot-toast";

const AppToast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "12px",
          padding: "14px 18px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.08)",
        },

        success: {
          style: {
            background: "#ecfdf5",
            color: "#065f46",
            border: "1px solid #a7f3d0",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ecfdf5",
          },
        },

        error: {
          style: {
            background: "#fef2f2",
            color: "#7f1d1d",
            border: "1px solid #fecaca",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },

        loading: {
          style: {
            background: "#eff6ff",
            color: "#1e3a8a",
            border: "1px solid #bfdbfe",
          },
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#eff6ff",
          },
        },
      }}
    />
  );
};

export default AppToast;
