import Layout from "@/widget/Layout";
import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import {
  startOfWeek,
  endOfWeek,
  getDayBetweenDates,
  formatDate,
} from "utils/dateUtils";
import Docs from "@/assets/icons/Docs";
import DocCheklist from "@/assets/icons/DocCheklist";
import TotalTugasSelesai from "@/components/Diagram/TotalTugasSelesai";
import TotalPomodoro from "@/components/Diagram/TotalPomodoro";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import RangeDate from "@/components/RangeDate";

const Dashboard = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;
  const [startDate, setStartDate] = useState(startOfWeek);
  const [endDate, setEndDate] = useState(endOfWeek);

  useEffect(() => {
    getDataTugas();
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

  const getTugasBelumDikerjakan = () => {
    const getDataTugas = semuaTugas.filter((data) =>
      data.status.toLowerCase().includes("belum dikerjakan")
    );
    const getDataTugasByDates = () => {
      const data = [];
      getDataTugas.forEach((item) => {
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

  const getTotalTugasHariIni = () => {
    const filteredDataByDate = getTugasBelumDikerjakan().filter((data) => {
      const today = moment().format("DD/MM/YYYY");
      return formatDate(data?.waktu_pengerjaan) === today;
    });

    return filteredDataByDate.length;
  };

  const dateProps = { startDate, setStartDate, endDate, setEndDate };

  return (
    <Layout>
      <div className="mx-5 mb-20 mt-5">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <h1 className="mb-2 text-3xl font-bold text-[#404040] md:mb-0">
            Dashboard
          </h1>
          <div>
            <RangeDate dateProps={dateProps} />
          </div>
        </div>
        <div>
          <div className="my-5 flex justify-between">
            <div className="mr-3 flex h-[200px] w-1/2 rounded-lg bg-white p-5 shadow-lg md:h-[150px] lg:w-[360px] xl:w-3/5">
              <div className="mr-2 hidden h-8 w-8 text-[#404040] md:block">
                <Docs />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-[#404040]">
                  Data Inventaris Tugas
                </h3>
                <p className="text-3xl font-semibold text-[#EE3D3D]">
                  {getTugasBelumDikerjakan().length}
                </p>
              </div>
            </div>
            <div className="mr-3 flex h-[200px] w-1/2 rounded-lg bg-white p-5 shadow-lg md:h-[150px] lg:w-[360px] xl:w-3/5">
              <div className="mr-2 hidden h-8 w-8 text-[#404040] md:block">
                <DocCheklist />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-[#404040]">
                  Data Tugas Hari Ini
                </h3>
                <p className="text-3xl font-semibold text-[#EE3D3D]">
                  {getTotalTugasHariIni()}
                </p>
              </div>
            </div>
          </div>
          <div className="my-5 flex flex-col justify-between xl:flex-row">
            <div className="mb-5 mr-3 h-[450px] w-full rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-3/5">
              <h2 className="mb-5 text-xl font-semibold text-[#404040]">
                Total Waktu Fokus
              </h2>
              <TotalPomodoro
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="mr-3 h-[450px] w-full rounded-lg bg-white p-5 pb-20 shadow-lg lg:w-[750px] xl:w-3/5">
              <h2 className="mb-5 text-xl font-semibold text-[#404040]">
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
    </Layout>
  );
};

export default Dashboard;
