/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NavDashboard from "@/components/NavDashboard";
import Sidebar from "@/components/Sidebar/Sidebar";

const style = {
  container: `bg-red-50 h-screen overflow-hidden relative`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:space-y-4 lg:w-[calc(100%-16rem)]`,
  main: `h-screen overflow-auto pb-36 pt-8 px-2 md:pb-8 md:pt-4 md:px-8 lg:pt-0 bg-red-50`,
};

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <div className="flex items-start">
        <Sidebar mobilePosition="right" />
        <div className={style.mainContainer}>
          <NavDashboard />
          <main className={style.main}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
