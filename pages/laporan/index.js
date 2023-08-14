import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import { GlobalContext } from "@/context/GlobalContext";
import TotalTugasSelesai from "@/components/Diagram/TotalTugasSelesai";
import TotalWaktuFokus from "@/components/Diagram/TotalWaktuFokus";
import TotalKategoriSelesai from "@/components/Diagram/TotalKategoriSelesai";
import TotalPomodoro from "@/components/Diagram/TotalPomodoro";
import moment from "moment";
import MiniCard from "@/components/MiniCard";
import {
  startOfWeek,
  endOfWeek,
  getDayBetweenDates,
  formatDate,
  formatDateWithFullDay,
} from "utils/dateUtils";
import ModalKonfirmasiKirimEmail from "@/components/ModalMessage/ModalKonfirmasiKirimEmail";
import ModalKonfirmasiUnduh from "@/components/ModalMessage/ModalKonfirmasiUnduh";
import RangeDate from "@/components/RangeDate";
import Download from "@/assets/icons/Download";
import Email from "@/assets/icons/Email";
const Laporan = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas, user } = state;
  const { getDataTugas, getUser } = handleFunctions;
  const [startDate, setStartDate] = useState(startOfWeek);
  const [endDate, setEndDate] = useState(endOfWeek);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [openModalUnduh, setOpenModalUnduh] = useState(false);

  useEffect(() => {
    getDataTugas();
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateList = getDayBetweenDates(startDate, endDate);

  const getTugasSelesai = () => {
    const getDataTugasSelesai = semuaTugas.filter((data) =>
      data.status.toLowerCase().includes("selesai")
    );

    const getDataTugasByDates = () => {
      const data = [];
      getDataTugasSelesai.forEach((item) => {
        const date = moment(item.waktu_pengerjaan);
        const start = moment(startDate);
        const end = moment(endDate);

        if (date >= start && date <= end) {
          data.push(item);
        }
      });

      return data;
    };

    const sortData = getDataTugasByDates().sort(
      (a, b) => new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan)
    );
    return sortData;
  };

  const getTotalPomodoro = () => {
    let total = 0;
    getTugasSelesai().forEach((item) => {
      total += parseInt(item.real);
    });
    return total;
  };

  const getTotalPomodoroHariIni = () => {
    const filteredDataByDate = semuaTugas.filter((data) => {
      const today = moment().format("DD/MM/YYYY");
      if (data.status === "Selesai") {
        return formatDate(data?.waktu_pengerjaan) === today;
      }
    });

    let total = 0;
    filteredDataByDate.forEach((item) => {
      total += parseInt(item?.real);
    });
    return total;
  };

  const getTotalTugasSelesai = () => {
    return getTugasSelesai().length;
  };

  const getTotalTugasHariIni = () => {
    const filteredDataByDate = getTugasSelesai().filter((data) => {
      const today = moment().format("DD/MM/YYYY");
      return formatDate(data?.waktu_pengerjaan) === today;
    });

    return filteredDataByDate.length;
  };

  const handleKirimEmail = () => {
    setOpenModalEmail(true);
  };

  const handleUnduhPDF = () => {
    setOpenModalUnduh(true);
  };

  const modalPropsEmail = {
    openModalEmail,
    setOpenModalEmail,
    getTugasSelesai,
    formatDate,
    formatDateWithFullDay,
    user,
    startDate,
    endDate,
  };

  const modalPropsUnduh = {
    openModalUnduh,
    setOpenModalUnduh,
    getTugasSelesai,
    formatDate,
    formatDateWithFullDay,
    user,
    startDate,
    endDate,
  };

  const dateProps = { startDate, setStartDate, endDate, setEndDate };

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-semibold">Laporan</h1>
        <div className="mt-10 flex flex-col">
          <div className="flex flex-wrap justify-between gap-5">
            <div className="flex w-full flex-col gap-5 md:flex-row">
              <button
                className="mr-3 flex w-full items-center justify-center rounded-lg bg-[#F16464] py-2.5 font-semibold text-white shadow-lg hover:bg-[#d63737] md:w-56"
                onClick={handleUnduhPDF}
              >
                <span className="mx-2 h-8 w-8">
                  <Download />
                </span>
                Unduh PDF
              </button>
              <button
                className="flex w-full items-center justify-center rounded-lg bg-[#F16464] py-2.5 font-semibold text-white shadow-lg hover:bg-[#d63737] md:w-56"
                onClick={handleKirimEmail}
              >
                <span className="mx-2 h-8 w-8">
                  <Email />
                </span>
                Kirim Ke Email
              </button>
            </div>
            <div>
              <RangeDate dateProps={dateProps} />
            </div>
          </div>

          <div className="mb-3 mt-10 flex w-full flex-col justify-between md:flex-row">
            <MiniCard title={"Total Pomodoro"} data={getTotalPomodoro()} />
            <MiniCard
              title={"Total Pomodoro Hari ini"}
              data={getTotalPomodoroHariIni()}
            />

            <MiniCard
              title={"Total Tugas Selesai"}
              data={getTotalTugasSelesai()}
            />

            <MiniCard
              title={"Total Tugas Selesai Hari ini"}
              data={getTotalTugasHariIni()}
            />
          </div>

          {/* grafik */}
          <div className="my-5 flex flex-col justify-between xl:flex-row">
            <div className="mb-5 mr-3 h-[450px] w-full rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-[525px]">
              <h2 className="mb-3 text-xl font-semibold">Total Waktu Fokus</h2>
              <TotalPomodoro
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="h-[450px] rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-[525px]">
              <h2 className="mb-3 text-xl font-semibold">
                Proporsi Waktu Fokus
              </h2>
              <TotalKategoriSelesai
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>

          <div className="my-5 flex flex-col justify-between xl:flex-row ">
            <div className="mb-5 mr-3 h-[450px] rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-[525px]">
              <h2 className="mb-3 text-xl font-semibold">Total Pomodoro</h2>
              <TotalWaktuFokus
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="h-[450px] rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-[525px]">
              <h2 className="mb-3 text-xl font-semibold">
                Total Tugas Selesai
              </h2>
              <TotalTugasSelesai
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalKonfirmasiKirimEmail modalPropsEmail={modalPropsEmail} />
      <ModalKonfirmasiUnduh modalPropsUnduh={modalPropsUnduh} />
    </Layout>
  );
};

export default Laporan;
