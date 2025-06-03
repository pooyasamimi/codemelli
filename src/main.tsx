import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/providers/ThemeProvider.tsx";
import DataProvider from "./contexts/providers/DataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <DataProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <App />
      </ThemeProvider>
    </DataProvider>
  // </StrictMode>
);
