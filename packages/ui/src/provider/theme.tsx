import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      storageKey="mi-theme"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
