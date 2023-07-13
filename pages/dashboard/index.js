import Layout from "@/widget/Layout";
import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import {
  startOfWeek,
  endOfWeek,
  getDayBetweenDates,
  formatDateReverse,
  formatDate,
  formatDateWithDay,
  formatDateWithFullDay,
} from "utils/dateUtils";
import Docs from "@/assets/icons/Docs";
import DocCheklist from "@/assets/icons/DocCheklist";
import TotalTugasSelesai from "@/components/Diagram/TotalTugasSelesai";
import TotalPomodoro from "@/components/Diagram/TotalPomodoro";
import moment from "moment";

const Dashboard = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;
  const [startDate] = useState(formatDateReverse(startOfWeek));
  const [endDate] = useState(formatDateReverse(endOfWeek));

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

  const getTotalTugasMingguIni = () => {
    const filteredDataByDate = getTugasSelesai().filter((data) => {
      const today = moment().format("DD/MM/YYYY");
      return formatDate(data?.waktu_pengerjaan) === today;
    });

    return filteredDataByDate.length;
  };

  const getTotalTugasHariIni = () => {
    const filteredDataByDate = getTugasSelesai().filter((data) => {
      const today = moment().format("DD/MM/YYYY");
      return formatDate(data?.waktu_pengerjaan) === today;
    });

    return filteredDataByDate.length;
  };

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-[#404040]">Dashboard</h1>
          <span className="rounded-md bg-white p-3 shadow-lg">
            {formatDateWithFullDay(startDate)} -{" "}
            {formatDateWithFullDay(endDate)}
          </span>
        </div>
        <div>
          <div className="my-5 flex justify-between">
            <div className="mr-3 h-[150px] w-3/5 rounded-lg bg-white p-5 shadow-lg"></div>
            <div className="mr-3 h-[150px] w-3/5 rounded-lg bg-white p-5 shadow-lg"></div>
          </div>
          <div className="my-5 flex justify-between">
            <div className="mr-3 h-[400px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
              <TotalPomodoro
                dataPomodoro={getTugasSelesai()}
                dateList={dateList}
              />
            </div>
            <div className="mr-3 h-[400px] w-3/5 rounded-lg bg-white p-5 shadow-lg">
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
