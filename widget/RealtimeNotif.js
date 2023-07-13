import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  memo,
  useRef,
  useCallback,
} from "react";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import { formatWaktu, setengahJamLalu } from "@/utils/dateUtils";
import { useTimer } from "@/utils/timer";
import { sendNotification } from "@/utils/notifikasiUtils";

const RealtimeNotif = () => {
  // const [currentTime, setCurrentTime] = useState(moment());
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas, user } = state;
  const { getDataTugas, getUser } = handleFunctions;
  const ref = useRef();
  // const MemoizedBox = memo(Box);

  // useEffect(() => {
  //   getDataTugas();
  //   getUser();

  //   ref.current = setInterval(() => {
  //     setCurrentTime(moment());
  //   }, 60000);

  //   return () => {
  //     clearInterval(ref.current);
  //   };
  // }, [currentTime]);

  const currentTime = "10/07/2023 21:19";
  const waktuPengerjaan = "10/07/2023 21:19";

  useEffect(() => {
    const tugasAkanDatang = semuaTugas.filter((data) => {
      return moment(data.waktu_pengerjaan).isSameOrAfter(currentTime);
    });

    tugasAkanDatang.forEach((data) => {
      console.log(
        formatWaktu(currentTime) === formatWaktu(data.waktu_pengerjaan)
      );
      const setengahJam = setengahJamLalu(data.waktu_pengerjaan);
      if (formatWaktu(currentTime) === formatWaktu(setengahJam)) {
        sendNotification(
          `Hai ${user[0].nama_depan},`,
          `Waktu pengerjaan kerjakan tugas ${data.judul_tugas} tiba 30 Menit lagi!`
        );
      } else if (
        formatWaktu(currentTime) === formatWaktu(data.waktu_pengerjaan)
      ) {
        sendNotification(
          `Hai,`,
          `Waktu mengerjakan tugas telah tiba, ayo kerjakan!`
        );
      }
    });
  }, [currentTime, semuaTugas, user]);
  return <div>RealtimeNotif</div>;
};

export default RealtimeNotif;
