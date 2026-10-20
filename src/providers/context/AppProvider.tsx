import { type ReactNode } from "react";
import AppContext from "./AppContext";
import useApp from "./useApp";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  const store = useApp();

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
