import React from "react";
import Menu from "@/assets/icons/Menu";
import Notification from "@/assets/icons/Notification";
import Profile from "@/assets/icons/Profile";
import { useStateContext } from "@/context/ContextProvider";
import ArrowDown from "@/assets/icons/ArrowDown";
import { useToggle } from "@/context/ContextProvider";

const NavDashboard = () => {
  const { toggle } = useToggle();
  return (
    <header className="relative z-10 h-16 items-center bg-white shadow md:h-20">
      <div className="flex-center relative z-10 mx-auto flex h-full flex-col justify-center px-3 text-white">
        <div className="lg:max-w-68 relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="group relative flex h-full w-12 items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={toggle}
              className="text-4xl text-gray-700 focus:outline-none"
            >
              <Menu />
            </button>
          </div>
          <div className="relative ml-5 mr-0 flex w-full items-center justify-end p-1 text-gray-700 sm:right-auto sm:mr-0">
            <button className="mr-2">
              <Notification />
            </button>
            <button className="mr-2">
              <Profile />
            </button>
            <div className="mr-2 flex">
              <p>Hai, Sella</p>
              <button>
                <ArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavDashboard;
