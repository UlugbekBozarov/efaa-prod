import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

// import { useConfig } from "@/hooks";

import { lightTheme } from "./light/light.theme";
// import { darkTheme } from "./dark/dark.theme";

const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  // const { mode } = useConfig();

  return (
    <MuiThemeProvider
      // theme={mode === "light" ? lightTheme : darkTheme}
      theme={lightTheme}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
