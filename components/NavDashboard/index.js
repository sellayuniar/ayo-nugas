import React, { useEffect, useState, useContext } from "react";
import Menu from "@/assets/icons/Menu";
import Notification from "@/assets/icons/Notification";
import Profile from "@/assets/icons/Profile";
import ArrowOut from "@/assets/icons/ArrowOut";
import ArrowDown from "@/assets/icons/ArrowDown";
// import { useToggle } from "@/context/ContextProvider";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import ModalNotification from "../ModalNotification";
import { GlobalContext } from "@/context/GlobalContext";
import { formatDate } from "@/utils/dateUtils";
import PushNotification from "../ModalNotification/PushNotification";
import moment from "moment";
import { sendNotification } from "@/utils/notifikasiUtils";

const NavDashboard = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const openMenu = () => {
    setOpenProfile(!openProfile);
  };
  const { state, handleFunctions } = useContext(GlobalContext);
  const { user, semuaTugas, isSidebar } = state;
  const { getUser, getDataTugas, handleSidebar } = handleFunctions;

  useEffect(() => {
    getUser();
    getDataTugas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const signOutHandler = () => {
    Cookies.remove("uid_user");
    Cookies.remove("email");
    return signOut(auth).then(router.push("/"));
  };

  const propsNotification = { openNotifications, setOpenNotifications };

  const userLogin = user[0];

  const dataTugasMendatang = semuaTugas?.filter((data) => {
    if (
      formatDate(data.waktu_pengerjaan) === formatDate(moment()) &&
      data.status === "Belum Dikerjakan"
    ) {
      return moment(data?.waktu_pengerjaan).isSameOrAfter(moment());
    }
  });

  const dataTugasTerlewat = semuaTugas?.filter((data) => {
    if (
      formatDate(data.waktu_pengerjaan) === formatDate(moment()) &&
      data.status === "Belum Dikerjakan"
    ) {
      return moment(data?.waktu_pengerjaan).isSameOrBefore(moment());
    }
  });

  console.log(dataTugasTerlewat);
  const handleClick = () => {
    const pesan_waktu = "telah tiba, ayo kerjakan!";
    sendNotification("Sella", "abc", pesan_waktu);
  };

  console.log(isSidebar);

  return (
    <header className="relative z-10 h-16 items-center bg-white shadow md:h-20">
      <div className="flex-center relative z-10 mx-auto flex h-full flex-col justify-center px-3 text-white">
        <div className="lg:max-w-68 relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="group relative flex h-full w-12 items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              className="text-4xl text-gray-700 focus:outline-none"
              onClick={handleSidebar}
            >
              <Menu />
            </button>
          </div>
          <div className="relative ml-5 mr-0 flex w-full items-center justify-end p-1 text-gray-700 sm:right-auto sm:mr-0">
            <button
              className="mr-2"
              // onClick={() => {
              //   setOpenNotifications(!openNotifications);
              // }}
              onClick={handleClick}
            >
              <Notification />
              <div className="hidden">
                <PushNotification
                  dataTugasMendatang={dataTugasMendatang}
                  userLogin={userLogin}
                  dataTugasTerlewat={dataTugasTerlewat}
                />
              </div>
            </button>
            <button className="mr-2">
              <Profile />
            </button>
            <div className="mr-2 flex">
              <p>Hai, {user[0]?.nama_depan}</p>
              <button onClick={openMenu}>
                <ArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          openProfile ? "block" : "hidden"
        }  absolute right-1 top-16 w-56 rounded-lg bg-white py-4 shadow-md dark:bg-[#42464D]`}
      >
        <ul className="">
          <li className="mb-3 px-10 py-3 hover:bg-gray-50">
            <Link href="/akun" className="flex items-center">
              <span className="mr-2">
                <Profile />
              </span>
              Akun
            </Link>
          </li>
          <li
            className="flex cursor-pointer items-center px-10 py-3 hover:bg-gray-50"
            onClick={signOutHandler}
          >
            <span className="mr-2 ">
              <ArrowOut />
            </span>
            <span>Keluar</span>
          </li>
        </ul>
      </div>
      <ModalNotification propsNotification={propsNotification} />
    </header>
  );
};

export default NavDashboard;
