import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import CloseBtn from "@/assets/icons/CloseBtn";
import Image from "next/image";
import logoDalam from "@/public/logo_dalam.png";

export default function SidenavHeader() {
  const { handleFunctions } = useContext(GlobalContext);
  const { handleSidebar } = handleFunctions;
  return (
    <div className="sticky top-5 z-10 mb-6 flex items-center justify-between bg-white px-10 pb-6 lg:justify-center lg:px-2">
      <Link href="/dashboard">
        <Image src={logoDalam} width="200" height="100" alt="logo" />
      </Link>
      <span onClick={handleSidebar} className="cursor-pointer lg:hidden">
        <CloseBtn color="#F05050" />
      </span>
    </div>
  );
}
