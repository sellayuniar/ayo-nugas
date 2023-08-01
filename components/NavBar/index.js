import Link from "next/link";
import BtnDaftarOutline from "../Buttons/BtnDaftarOutline";
import logoDalam from "@/public/logo_dalam.png";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            <Image src={logoDalam} width="200" height="100" alt="logo" />
          </span>
        </Link>
        <div className="flex md:order-2">
          <BtnDaftarOutline slug="masuk" namaBtn="masuk" />
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-[#EE3D3D] md:p-0  md:hover:text-[#EE3D3D] "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900  hover:text-[#EE3D3D] md:p-0  md:hover:text-[#EE3D3D] "
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900  hover:text-[#EE3D3D] md:p-0  md:hover:text-[#EE3D3D] "
              >
                Cara Penggunaaan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900  hover:text-[#EE3D3D] md:p-0  md:hover:text-[#EE3D3D] "
              >
                Fitur
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
