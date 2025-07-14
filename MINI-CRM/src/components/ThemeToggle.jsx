import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="mt-auto px-4 py-2 rounded-md font-semibold transition bg-secondary dark:bg-gray-700 text-text-main dark:text-white"
    >
      {theme === "light" ? "Dark Mode" : " Light Mode"}
    </button>
  );
}
