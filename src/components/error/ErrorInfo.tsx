import { useTranslation } from "react-i18next";
import type { FieldError } from "react-hook-form";
import { Alert, Typography } from "@mui/material";

import { Info } from "@/assets";

interface ErrorInfoProps {
  error?: FieldError | undefined;
}

const ErrorInfo = ({ error }: ErrorInfoProps) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <Alert severity="error" icon={<Info />} sx={{ marginTop: "7px" }}>
        <Typography fontSize="12px" color="error.dark" marginLeft="10px">
          {error?.message || t("Invalid value")}
        </Typography>
      </Alert>
    );
  } else return undefined;
};

export default ErrorInfo;
