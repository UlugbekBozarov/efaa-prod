import { IconButton, styled } from "@mui/material";
import { get } from "lodash";

export const SidebarItem = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  position: "relative",
  width: "100%",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: active ? "5px" : undefined,
  paddingLeft: active ? "7px" : undefined,
  backgroundColor: active ? get(theme, "palette.primary.main") : "transparent",
  color: active
    ? get(theme, "palette.primary.contrastText")
    : get(theme, "palette.primary.main"),
  borderRadius: active ? "20px 0 0 20px" : undefined,
  cursor: "pointer",
  "&:hover": active
    ? {
        backgroundColor: get(theme, "palette.primary.main"),
      }
    : undefined,
  "&::before": active
    ? {
        position: "absolute",
        content: '""',
        width: "18px",
        height: "18px",
        top: "-17px",
        right: "0px",
        borderBottomRightRadius: "18px",
        backgroundColor: "transparent",
        boxShadow: `5px 5px 0 0 ${get(theme, "palette.primary.main")}`,
        zIndex: 0,
      }
    : undefined,
  "&::after": active
    ? {
        position: "absolute",
        content: '""',
        width: "18px",
        height: "18px",
        bottom: "-17px",
        right: "0px",
        borderTopRightRadius: "18px",
        backgroundColor: "transparent",
        boxShadow: `5px -5px 0 0 ${get(theme, "palette.primary.main")}`,
        zIndex: 0,
      }
    : undefined,
}));
