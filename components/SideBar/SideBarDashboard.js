import React from "react";
import DocCheklist from "@/assets/icon/DocCheklist";
import Docs from "@/assets/icon/Docs";
import Home from "@/assets/icon/Home";
import Report from "@/assets/icon/Report";
import Link from "next/link";

const SideBarDashboard = () => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full shadow-lg transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-4 dark:bg-gray-800">
          <Link href="/dashboard" className="mb-10 flex items-center pl-2.5">
            <span className="self-center whitespace-nowrap text-3xl font-semibold tracking-widest dark:text-white">
              Ayo Nugas
            </span>
          </Link>
          <ul className="space-y-8 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center rounded-full bg-[#F05050] p-3 text-white shadow-lg"
              >
                <div className="ml-2">
                  <Home />
                </div>
                <span className="ml-3 text-lg font-semibold">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <div className="ml-2">
                  <Docs />
                </div>
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Inventaris Tugas
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/tugas-hari-ini"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <div>
                  <DocCheklist />
                </div>
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Tugas Hari ini
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <div>
                  <Report />
                </div>
                <span className="ml-3 flex-1 whitespace-nowrap">Laporan</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      asdds
    </>
  );
};

export default SideBarDashboard;
