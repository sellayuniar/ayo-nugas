import React from "react";
import CloseBtn from "@/assets/icons/CloseBtn";

const ModalNotification = ({ propsNotification }) => {
  const { openNotifications, setOpenNotifications } = propsNotification;
  return (
    <div
      className={`${
        openNotifications ? "block" : "hidden"
      }  h-min-56 absolute right-24 top-16 w-80 rounded-lg bg-white p-5 py-4 shadow-md dark:bg-[#42464D]`}
    >
      <div className="flex">
        <p className="text-xl font-semibold">Notifikasi</p>
        <span className="text-red-500">
          <CloseBtn />
        </span>
      </div>
    </div>
  );
};

export default ModalNotification;
