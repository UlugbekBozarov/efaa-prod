import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { get } from "lodash";

import { Info, Logout } from "@/assets";
import { useGlobalContext } from "@/hooks";
import { CustomCheckbox } from "@/components";

const PrivateLayoutLogout = () => {
  const { t } = useTranslation();

  const [cleanTheDb, setCleanTheDb] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const {
    actions: { logout },
  } = useGlobalContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCleanTheDb = () => {
    setCleanTheDb((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <IconButton size="large" onClick={handleOpen} sx={{ mx: "auto" }}>
        <Logout />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "500px",
            minHeight: "100px",
            background: get(theme, "palette.background.paper"),
            borderRadius: "20px",
          })}
        >
          <Box sx={{ padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "error.main",
                mb: "20px",
                mt: "10px",
              }}
            >
              <Logout width="70" height="70" />
            </Box>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {t("Are you sure you want to log out?")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginBottom: "50px" }}
            >
              {t("Logging out will end your current session.")}
            </Typography>
            <Box sx={{ marginBottom: "7px" }}>
              <FormControlLabel
                checked={cleanTheDb}
                label={t("Clear data on this device (recommended)")}
                onChange={handleChangeCleanTheDb}
                control={<CustomCheckbox />}
              />
            </Box>
            <Alert severity="warning" icon={<Info />}>
              {cleanTheDb
                ? t(
                    "Data on this device will be removed. All information will be downloaded again on your next login. This is recommended for shared devices.",
                  )
                : t(
                    "Data will remain on this device. This is recommended only for personal devices.",
                  )}
            </Alert>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                columnGap: "10px",
                pt: "20px",
              }}
            >
              <Button
                autoFocus
                variant="outlined"
                onClick={handleClose}
                color="inherit"
                sx={{ minWidth: "100px" }}
              >
                {t("No")}
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={handleLogout}
                sx={{ px: "20px" }}
              >
                {t("Yes, logout")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default PrivateLayoutLogout;
