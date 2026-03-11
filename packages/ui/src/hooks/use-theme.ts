import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { setTheme, theme, systemTheme } = useNextTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");

  return { theme: currentTheme, toggleTheme };
};
