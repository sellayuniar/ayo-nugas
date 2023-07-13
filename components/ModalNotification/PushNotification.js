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
}) => {
  const uid_user = Cookies.get("uid_user");
  const email_user = Cookies.get("email");
  const notifikasiCollectionRef = collection(db, "notifikasi");
  const currentTime = useTimer();
  const [notificationSent, setNotificationSent] = useState(false);

  const addNotificationsData = async (data, pesan_waktu) => {
    await addDoc(notifikasiCollectionRef, {
      uid: uid_user,
      email_user: email_user,
      judul_tugas: data.judul_tugas,
      pesan_waktu: pesan_waktu,
      waktu_kirim_notif: formatWaktu(currentTime),
    });
  };

  dataTugasMendatang?.forEach((data) => {
    const setengahJam = setengahJamLalu(data.waktu_pengerjaan);
    const waktuSama =
      formatWaktu(currentTime) === formatWaktu(data.waktu_pengerjaan);
    const waktusetengahJamSebelum =
      formatWaktu(currentTime) === formatWaktu(setengahJam);

    if (waktuSama) {
      const pesan_waktu = "telah tiba, ayo kerjakan!";
      sendNotification(userLogin.nama_depan, data.judul_tugas, pesan_waktu);
      addNotificationsData(data, pesan_waktu);
    } else if (waktusetengahJamSebelum) {
      const pesan_waktu = "tiba dalam 30 menit lagi!";
      sendNotification(userLogin.nama_depan, data.judul_tugas, pesan_waktu);
      addNotificationsData(data, pesan_waktu);
    }
  });

  //kalo waktu sekarang sama dengan satu jam setelah waktu pengerjaan tugas
  dataTugasTerlewat?.forEach((data) => {
    const satuJam = satuJamKemudian(data.waktu_pengerjaan);
    const waktuTerlewatSatuJam =
      formatWaktu(currentTime) === formatWaktu(satuJam);

    if (waktuTerlewatSatuJam) {
      const pesan_waktu = "terlewat 1 jam yang lalu, ayo perbarui jadwalmu!";
      sendNotification(userLogin.nama_depan, data.judul_tugas, pesan_waktu);
      addNotificationsData(data, pesan_waktu);
    }
  });

  return <div>PushNotification</div>;
};

export default PushNotification;
