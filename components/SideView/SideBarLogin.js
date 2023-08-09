import React from "react";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import ImgLogin from "@/assets/ImgSvg/ImgLogin";
import { useRouter } from "next/router";

const SideBarLogin = () => {
  const router = useRouter();
  return (
    <div className="flex lg:basis-6/12">
      <div className="flex hidden w-full bg-[#FDECEC] pl-2 pt-2 lg:block">
        <span
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft />
        </span>
        <div className="flex justify-center pt-10">
          <ImgLogin />
        </div>
      </div>
    </div>
  );
};

export default SideBarLogin;
