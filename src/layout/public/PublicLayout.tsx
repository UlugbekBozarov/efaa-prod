import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PublicLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
