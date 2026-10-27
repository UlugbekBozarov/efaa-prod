import { memo } from "react";

const Logout = ({ width = "20", height = "21" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.67505 6.16993C6.90755 3.46993 8.29505 2.36743 11.3325 2.36743H11.43C14.7825 2.36743 16.125 3.70993 16.125 7.06243V11.9524C16.125 15.3049 14.7825 16.6474 11.43 16.6474H11.3325C8.31755 16.6474 6.93005 15.5599 6.68255 12.9049"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2501 9.5H2.71509"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.3875 6.98755L1.875 9.50005L4.3875 12.0125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Logout);
