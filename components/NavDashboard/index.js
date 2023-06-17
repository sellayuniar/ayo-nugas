import React from "react";
import Menu from "@/assets/icons/Menu";
import Notification from "@/assets/icons/Notification";
import Profile from "@/assets/icons/Profile";
import { useStateContext } from "@/context/ContextProvider";
import ArrowDown from "@/assets/icons/ArrowDown";

const NavButton = ({ customFunc, icon }) => {
  return (
    <button
      type="button"
      onClick={customFunc}
      className="relative mr-6 rounded-full px-3 text-xl hover:bg-gray-50"
    >
      <span className="absolute left-0 right-2 top-1 inline-flex h-6 w-6 rounded-full">
        {icon}
      </span>
    </button>
  );
};

const NavDashboard = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <div className="relative flex h-16 justify-between p-2 shadow-sm">
      <NavButton
        icon={<Menu />}
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
      />

      <div className="flex">
        <NavButton icon={<Notification />} />
        <NavButton icon={<Profile />} />
        <div className="flex cursor-pointer items-center gap-2 p-1">
          <p>
            <span className="text-14 text-gray-400">hai,</span>
            <span className="text-14 ml-1 font-bold text-gray-400">
              {" "}
              Sella{" "}
            </span>
          </p>
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
