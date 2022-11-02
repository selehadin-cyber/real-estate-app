import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return () => {
      
    }
  }, [])
  
  return (
    <AuthContextProvider>
      <div className="light">
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
