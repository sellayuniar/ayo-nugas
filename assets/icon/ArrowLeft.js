import React from "react";

const ArrowLeft = () => {
  return (
    <svg
      width={45}
      height={40}
      viewBox="0 0 45 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="22.5" cy={20} rx="22.5" ry={20} fill="#F05050" />
      <path
        d="M21.5 27.5L14 20M14 20L21.5 12.5M14 20H32"
        stroke="#FEFEFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
