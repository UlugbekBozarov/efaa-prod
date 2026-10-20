import { Fragment, memo } from "react";
import { useTranslation } from "react-i18next";
import { Box, LinearProgress, Typography } from "@mui/material";

import { Logo } from "@/assets";

interface FallbackSuspenseProps {
  loadingTextKey?: string | undefined;
  value?: number | undefined;
}

const FallbackSuspense = ({
  loadingTextKey = "Loading...",
  value,
}: FallbackSuspenseProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        p: "20px",
      }}
    >
      <Box sx={{ width: "100%", maxHeight: "700px", paddingBottom: "70px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "200px", color: "primary.main" }}>
            <Logo />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              textAlign: typeof value === "number" ? "left" : "center",
              marginBottom: "3px",
            }}
          >
            {t(loadingTextKey)}
          </Typography>
          {typeof value === "number" ? (
            <Fragment>
              <LinearProgress
                variant="determinate"
                value={value}
                sx={{ borderRadius: "5px" }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  textAlign: "center",
                  color: "text.secondary",
                  marginTop: "7px",
                }}
              >
                {value}%
              </Typography>
            </Fragment>
          ) : undefined}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(FallbackSuspense);
