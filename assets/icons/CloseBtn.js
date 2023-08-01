import React from "react";

const CloseBtn = ({ color }) => {
  return (
    <svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 15.9085L13.5 5.375M4.5 5.375L13.5 15.9085"
        stroke={`${color ? color : "#FEFEFE"}`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseBtn;
