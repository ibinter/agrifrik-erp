"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CYCLE: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];

const icons = {
  light: <Sun size={15} />,
  dark: <Moon size={15} />,
  system: <Monitor size={15} />,
};

const labels = {
  light: "Thème clair",
  dark: "Thème sombre",
  system: "Thème système",
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    const idx = CYCLE.indexOf(theme);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  }

  return (
    <button
      onClick={cycleTheme}
      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      {icons[theme]}
    </button>
  );
}
