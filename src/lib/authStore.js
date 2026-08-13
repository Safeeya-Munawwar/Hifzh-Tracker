import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "./axiosInstance";
import toast from "react-hot-toast";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      isAuthLoading: false,

      setHydrated: () => set({ isHydrated: true }),

      setAuth: (accessToken, user) => set({ accessToken, user }),

      logoutLocal: () => {
        set({ accessToken: null, user: null });
      },

      login: async (credentials) => {
        try {
          set({ isAuthLoading: true });
          const response = await axiosInstance.post("/auth/login", credentials);

          const responseData = response.data?.data || response.data;
          const accessToken = responseData?.accessToken;
          const user = responseData?.user;

          if (!accessToken || !user) throw new Error("Invalid response format");

          set({ accessToken, user });
          toast.success(response.data?.message || "Logged in successfully!");
          return { success: true, user };
        } catch (error) {
          const errorMsg = error.response?.data?.message;
          const message = Array.isArray(errorMsg)
            ? errorMsg[0]
            : errorMsg || "Login failed";
          toast.error(message);
          return { success: false, error: message };
        } finally {
          set({ isAuthLoading: false });
        }
      },

      register: async (credentials) => {
        try {
          set({ isAuthLoading: true });
          const response = await axiosInstance.post(
            "/auth/register",
            credentials
          );
          toast.success(
            response.data?.message || "User registered successfully!"
          );
          return { success: true };
        } catch (error) {
          const errorMsg = error.response?.data?.message;
          const message = Array.isArray(errorMsg)
            ? errorMsg[0]
            : errorMsg || "Registration failed";
          toast.error(message);
          return { success: false, error: message };
        } finally {
          set({ isAuthLoading: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          toast.success("Logged out successfully");
        } catch (e) {
          console.error("Logout error:", e);
        } finally {
          set({ accessToken: null, user: null });
          localStorage.removeItem("auth-storage");
        }
      },

      refresh: async () => {
        try {
          set({ isAuthLoading: true });
          const response = await axiosInstance.post("/auth/refresh");

          const responseData = response.data?.data || response.data;
          const accessToken = responseData?.accessToken;
          const user = responseData?.user;

          if (!accessToken || !user)
            throw new Error("Invalid refresh response");

          set({ accessToken, user });
          return { accessToken, user };
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          set({ accessToken: null, user: null });
          return null;
        } finally {
          set({ isAuthLoading: false });
        }
      },

      isLoggedIn: () => Boolean(get().accessToken && get().user),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.();
      },
    }
  )
);

export default useAuthStore;
