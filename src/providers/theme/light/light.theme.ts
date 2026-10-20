import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme<any>({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      // paper: "#f5f5f5",
      secondary: "#f5f5f5",
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
          marginLeft: "auto",
        },
      },
    },
  },
});
