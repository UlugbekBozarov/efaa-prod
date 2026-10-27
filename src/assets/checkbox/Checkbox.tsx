import { memo } from "react";

const Checkbox = ({ width = "20", height = "20" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.85"
        y="0.85"
        width="18.3"
        height="18.3"
        rx="4.15"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
};

export default memo(Checkbox);
