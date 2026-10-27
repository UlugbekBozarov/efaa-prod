import { memo } from "react";
import { useTheme } from "@mui/material";
import { get } from "lodash";

const CheckIndeterminate = ({ width = "20", height = "20" }) => {
  const { palette } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="800" rx="200" fill="currentColor" />
      <path
        d="M226 400L575 400"
        stroke={get(palette, "primary.contrastText")}
        opacity={0.8}
        strokeWidth="66.67"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default memo(CheckIndeterminate);
