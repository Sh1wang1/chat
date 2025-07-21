import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: (() => {
    const t = localStorage.getItem("chat-theme") || "coffee";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", t);
    }
    return t;
  })(),
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    // Apply theme to <html> tag for DaisyUI
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  },
}));