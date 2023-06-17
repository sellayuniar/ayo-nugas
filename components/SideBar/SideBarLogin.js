import React from "react";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import ImgLogin from "@/assets/ImgSvg/ImgLogin";
import { useRouter } from "next/router";

const SideBarLogin = ({ heightValue }) => {
  const router = useRouter();
  return (
    <div className={`h-[${heightValue}px] basis-1/2 bg-[#FDECEC] pl-2`}>
      <span
        className="ml-3 mt-2 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </span>
      <div className="mt-16 flex justify-center">
        <ImgLogin />
      </div>
    </div>
  );
};

export default SideBarLogin;
