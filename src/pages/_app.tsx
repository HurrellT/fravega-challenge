import { ThemeProvider } from "@/styles/ThemeProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FavoritesProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
