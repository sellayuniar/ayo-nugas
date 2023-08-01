import React, { useEffect, useState } from "react";
import CloseBtn from "@/assets/icons/CloseBtn";
import { db } from "@/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import { formatDate } from "@/utils/dateUtils";
import moment from "moment";

const ModalNotification = ({ propsNotification }) => {
  const {
    newNotif,
    setNewNotif,
    openNotifications,
    setOpenNotifications,
    setFetchStatus,
    fetchStatus,
  } = propsNotification;
  const [dataNotifikasi, setDataNotifikasi] = useState([]);
  const uid_user = Cookies.get("uid_user");
  const notifikasiCollectionRef = collection(db, "notifikasi");
  const queryGetNotifikasiByUID = query(
    notifikasiCollectionRef,
    where("uid", "==", uid_user || "")
  );
  const [loading, setLoading] = useState(false);

  const getNotifikasi = async () => {
    setLoading(true);
    const data = await getDocs(queryGetNotifikasiByUID);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(filteredData);
    setDataNotifikasi(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    getNotifikasi();
    if (fetchStatus) {
      getNotifikasi();
      setNewNotif(true);
      setFetchStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus]);

  const formatDateKirimNotif = (date) => {
    return moment(date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
  };

  const formatDateSort = (date) => {
    return moment(date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm");
  };

  const dataNotifHariIni = dataNotifikasi.filter((data) => {
    const today = moment().format("DD/MM/YYYY");
    return formatDateKirimNotif(data.waktu_kirim_notif) === today;
  });

  const dataNotifikasiHariIni = dataNotifHariIni.sort(
    (a, b) =>
      new Date(b.waktu_kirim_notif).toDateString() -
      new Date(a.waktu_kirim_notif).toDateString()
  );

  console.log(dataNotifikasiHariIni);

  // const removeDuplicates = () => {
  //   const seen = new Set();
  //   const uniqueNotif = dataNotifikasiHariIni.filter((item) => {
  //     const duplicate = seen.has(item.waktu_kirim_notif);
  //     seen.add(item.waktu_kirim_notif);
  //     return !duplicate;
  //   });
  //   return uniqueNotif;
  // };

  return (
    <div
      className={`${
        openNotifications ? "block" : "hidden"
      }  absolute right-24 top-16 h-72 w-80 overflow-y-scroll rounded-lg bg-white shadow-md dark:bg-[#42464D]`}
    >
      <div className="fixed z-10 flex w-[300px] justify-between border-b-4 bg-white">
        <p className="p-2 text-xl font-semibold ">Notifikasi Hari Ini</p>
        <span
          className="cursor-pointer p-2 text-red-500"
          onClick={() => {
            setOpenNotifications(false);
            if (newNotif) setNewNotif(false);
          }}
        >
          <CloseBtn color="#F05050" />
        </span>
      </div>

      <div className="mt-12">
        {dataNotifikasiHariIni.length >= 1 ? (
          dataNotifikasiHariIni.map((data) => (
            <div className="border-b p-2" key={data.id}>
              <p>
                Waktu pengerjaan {data.judul_tugas} {data.pesan_waktu}
              </p>
              <p className="text-xs text-slate-600">
                {formatDateSort(data.waktu_kirim_notif)}
              </p>
            </div>
          ))
        ) : (
          <p className="px-5 py-10">Belum ada notifikasi!</p>
        )}
        <p></p>
      </div>
    </div>
  );
};

export default ModalNotification;
