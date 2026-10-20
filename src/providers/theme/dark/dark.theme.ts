import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e88e5",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          position: "relative",
          textTransform: "initial",
        },
        sizeSmall: {
          height: "40px",
        },
        sizeMedium: {
          height: "44px",
        },
        sizeLarge: {
          height: "56px",
        },
        startIcon: {
          position: "sticky",
          left: "20px",
        },
        endIcon: {
          position: "absolute",
          right: "20px",
        },
      },
    },
  },
});
