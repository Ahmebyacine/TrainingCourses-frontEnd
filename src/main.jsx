import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import "@fontsource/cairo";
import { ThemeProvider } from "@/components/themeProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);