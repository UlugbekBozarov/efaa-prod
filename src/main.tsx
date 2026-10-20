import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { FallbackSuspense } from "@/components";

import "./i18n";

import "./index.css";
import App from "./App.tsx";

console.log(
  `%c
███████╗███████╗ █████╗  █████╗ 
██╔════╝██╔════╝██╔══██╗██╔══██╗
█████╗  █████╗  ███████║███████║
██╔══╝  ██╔══╝  ██╔══██║██╔══██║
███████╗██║     ██║  ██║██║  ██║
╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝

Effective Automation at your fingertips.`,
  "font-family:monospace;color:#1976d2;font-size:12px;",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<FallbackSuspense />}>
      <App />
    </Suspense>
  </StrictMode>,
);
