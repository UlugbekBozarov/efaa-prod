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

export const DeviceNameWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  right: "-20px",
  bottom: "50px",
  width: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: get(theme, "palette.primary.main"),
  borderRadius: "0 20px 20px 0",
  writingMode: "sideways-lr",
  textOrientation: "mixed",
  padding: "24px 0px 24px 0px",
  zIndex: 9,
  // "&::before": {
  //   position: "absolute",
  //   content: '""',
  //   width: "12px",
  //   height: "12px",
  //   top: "-11px",
  //   left: "9px",
  //   borderBottomLeftRadius: "10px",
  //   backgroundColor: "transparent",
  //   boxShadow: `-3px 3px 0 0 ${get(theme, "palette.primary.main")}`,
  // },
  // "&::after": {
  //   position: "absolute",
  //   content: '""',
  //   width: "10px",
  //   height: "10px",
  //   bottom: "-9px",
  //   left: "8px",
  //   borderTopLeftRadius: "10px",
  //   backgroundColor: "transparent",
  //   boxShadow: `-3px -3px 0 0 ${get(theme, "palette.primary.main")}`,
  // },
}));
