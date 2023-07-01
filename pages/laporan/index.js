import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import { GlobalContext } from "@/context/GlobalContext";
import TotalTugasSelesai from "@/components/Diagram/TotalTugasSelesai";
import TotalWaktuFokus from "@/components/Diagram/TotalWaktuFokus";
import TotalKategoriSelesai from "@/components/Diagram/TotalKategoriSelesai";
import moment from "moment";

const Laporan = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;

  useEffect(() => {
    getDataTugas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const startOfWeek = moment().startOf("isoWeek").toDate();
  const endOfWeek = moment().endOf("isoWeek").toDate();

  const getDayBetweenDates = (startDate, endDate) => {
    let dates = [];
    let now = moment(startDate);

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("MM/DD/YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  const dateList = getDayBetweenDates(startOfWeek, endOfWeek);

  const getTotalTugasSelesai = () => {
    const getDataTugasSelesai = semuaTugas.filter((data) =>
      data.status.toLowerCase().includes("selesai")
    );

    const getDataTugasByDates = () => {
      const data = [];
      getDataTugasSelesai.forEach((item) => {
        const date = moment(item.waktu_pengerjaan);
        const startDate = moment(startOfWeek);
        const endDate = moment(endOfWeek);
        console.log(date >= startDate && date <= endDate);

        if (date >= startDate && date <= endDate) {
          data.push(item);
        }
      });

      return data;
    };

    return getDataTugasByDates();
  };

  console.log(semuaTugas, getTotalTugasSelesai());

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-semibold">Laporan</h1>
        <div className="mt-5 flex flex-col">
          <div className="flex justify-between">
            <div className="flex">
              <button>Unduh PDF</button>
              <button>Kirim Ke Email</button>
            </div>
            <div>
              <span>
                {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
              </span>
            </div>
          </div>
          {/* data total */}
          <div className="my-10">
            <div>
              <h3> Total Pomodoro </h3>
              <p> 40 </p>
            </div>
          </div>

          {/* grafik */}
          <div className="my-10 flex justify-between">
            <div className="h-[300px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalKategoriSelesai
                dataPomodoro={getTotalTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mr-3 h-[300px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalWaktuFokus
                dataPomodoro={getTotalTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="h-[300px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalTugasSelesai
                dataPomodoro={getTotalTugasSelesai()}
                dateList={dateList}
              />
            </div>
          </div>

          {/* tutup container */}
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
