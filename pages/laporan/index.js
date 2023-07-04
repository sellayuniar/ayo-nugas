import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import { GlobalContext } from "@/context/GlobalContext";
import TotalTugasSelesai from "@/components/Diagram/TotalTugasSelesai";
import TotalWaktuFokus from "@/components/Diagram/TotalWaktuFokus";
import TotalKategoriSelesai from "@/components/Diagram/TotalKategoriSelesai";
import TotalPomodoro from "@/components/Diagram/TotalPomodoro";
import RangeWaktuFokus from "@/components/Diagram/RangeWaktuFokus";
import moment from "moment";
import MiniCard from "@/components/MiniCard";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {
  startOfWeek,
  endOfWeek,
  getDayBetweenDates,
  formatDateReverse,
  formatDate,
} from "utils/dateUtils";
import DataPDF from "@/components/ViewLaporanData/DataPDF";

const Laporan = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;
  const [startDate, setStartDate] = useState(formatDateReverse(startOfWeek));
  const [endDate, setEndDate] = useState(formatDateReverse(endOfWeek));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    getDataTugas();
    setIsClient(true);
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

    return getDataTugasByDates();
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
      return formatDate(data?.waktu_pengerjaan) === today;
    });

    console.log(filteredDataByDate);

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

  console.log(getTotalTugasSelesai());

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-semibold">Laporan</h1>
        <div className="mt-10 flex flex-col">
          <div className="flex justify-between">
            <div className="flex">
              {isClient ? (
                <PDFDownloadLink
                  document={<DataPDF dataTugasSelesai={getTugasSelesai()} />}
                  className="text-md mr-5 flex  w-56 items-center justify-center rounded-lg bg-[#F16464] py-2.5 font-semibold text-white shadow-lg hover:bg-[#d63737]"
                  fileName={`Laporan Tugas ${startDate} - ${endDate}`}
                >
                  Unduh PDF
                </PDFDownloadLink>
              ) : null}

              <button className="w-56 rounded-lg bg-[#F16464] py-2.5 font-semibold text-white shadow-lg hover:bg-[#d63737]">
                Kirim Ke Email
              </button>
            </div>
            <div>
              <span className="text-md w-full rounded-lg bg-white p-5 font-semibold">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  className="mt-2 w-full rounded-full border-none focus:border-red-300 focus:outline-none focus:ring-0 md:w-[200px] lg:w-[150px]"
                />
                -
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  className="mt-2 w-full rounded-full border-none focus:border-red-300 focus:outline-none focus:ring-0 md:w-[200px] lg:w-[150px]"
                />
              </span>
            </div>
          </div>
          {/* data total */}
          <div className="h-[500px] w-[800px]">
            {isClient ? (
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                <DataPDF dataTugasSelesai={getTugasSelesai()} />
              </PDFViewer>
            ) : null}
          </div>

          <div className="mb-3 mt-10 flex flex-col justify-between md:flex-row">
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
          <div className="my-5 flex justify-between">
            <div className="mr-3 h-[400px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalWaktuFokus
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="h-[400px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalKategoriSelesai
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>

          <div className="my-5 flex justify-between">
            <div className="mr-3 h-[450px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalPomodoro
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="h-[450px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalTugasSelesai
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>

          <div className="h-[450px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
            <RangeWaktuFokus />
          </div>

          {/* tutup container */}
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
