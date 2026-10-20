// src/providers/context/useAppStore.ts
import { useContext } from "react";

import AppContext from "../../providers/context/AppContext";
import type { UseAppType } from "../../providers/context/useApp";

export function useGlobalContext(): UseAppType {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used inside AppProvider");
  return context;
}
