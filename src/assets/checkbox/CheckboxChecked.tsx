import { memo } from "react";
import { useTheme } from "@mui/material";
import { get } from "lodash";

const CheckboxChecked = ({ width = "20", height = "20" }) => {
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
        d="M233.333 400L329.692 496.357C331.705 498.367 334.967 498.37 336.98 496.357L566.667 266.667"
        stroke={get(palette, "primary.contrastText")}
        opacity={0.8}
        strokeWidth="66.6667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(CheckboxChecked);
