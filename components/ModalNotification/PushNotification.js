import React, { useEffect, useState } from "react";
import { useTimer } from "@/utils/timer";
import { sendNotification } from "@/utils/notifikasiUtils";
import {
  formatWaktu,
  setengahJamLalu,
  satuJamKemudian,
} from "@/utils/dateUtils";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Cookies from "js-cookie";

const PushNotification = ({
  dataTugasMendatang,
  userLogin,
  dataTugasTerlewat,
  setFetchStatus,
}) => {
  const uid_user = Cookies.get("uid_user");
  const email_user = Cookies.get("email");
  const notifikasiCollectionRef = collection(db, "notifikasi");
  const currentTime = useTimer();

  useEffect(() => {
    checkNotifikasi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  const addNotificationsData = async (data, pesan_waktu) => {
    await addDoc(notifikasiCollectionRef, {
      uid: uid_user,
      email_user: email_user,
      judul_tugas: data.judul_tugas,
      pesan_waktu: pesan_waktu,
      waktu_kirim_notif: formatWaktu(currentTime),
    });
    setFetchStatus(true);
  };

  const checkNotifikasi = () => {
    dataTugasMendatang?.forEach((data) => {
      const setengahJam = setengahJamLalu(data.waktu_pengerjaan);
      const waktuSama =
        formatWaktu(currentTime) === formatWaktu(data.waktu_pengerjaan);
      const waktusetengahJamSebelum =
        formatWaktu(currentTime) === formatWaktu(setengahJam);

      if (waktuSama) {
        const pesan_waktu = "telah tiba, ayo kerjakan!";
        addNotificationsData(data, pesan_waktu);
        return sendNotification(
          userLogin.nama_depan,
          data.judul_tugas,
          pesan_waktu
        );
      } else if (waktusetengahJamSebelum) {
        const pesan_waktu = "tiba dalam 30 menit lagi!";
        addNotificationsData(data, pesan_waktu);
        return sendNotification(
          userLogin.nama_depan,
          data.judul_tugas,
          pesan_waktu
        );
      }
    });

    //kalo waktu sekarang sama dengan satu jam setelah waktu pengerjaan tugas
    dataTugasTerlewat?.forEach((data) => {
      const satuJam = satuJamKemudian(data.waktu_pengerjaan);
      const waktuTerlewatSatuJam =
        formatWaktu(currentTime) === formatWaktu(satuJam);

      if (waktuTerlewatSatuJam) {
        const pesan_waktu = "terlewat 1 jam yang lalu, ayo perbarui jadwalmu!";
        addNotificationsData(data, pesan_waktu);
        return sendNotification(
          userLogin.nama_depan,
          data.judul_tugas,
          pesan_waktu
        );
      }
    });
  };

  return <div>PushNotification</div>;
};

export default PushNotification;
