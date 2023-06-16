import React from "react";
import { useRouter } from "next/router";

const BtnDaftarOutline = ({ slug, namaBtn }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.push(`/${slug}`);
      }}
      className="text-[#EE3D3D] bg-transparent border-2 border-[#EE3D3D] focus:ring-2 focus:ring-[#EE3D3D] font-medium rounded-full text-md px-6 py-2 text-center mr-3 md:mr-0"
    >
      {namaBtn}
    </button>
  );
};

export default BtnDaftarOutline;
