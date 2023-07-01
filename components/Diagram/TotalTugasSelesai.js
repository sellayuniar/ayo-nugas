import React from "react";
import { Bar, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";

const TotalTugasSelesai = ({ dataPomodoro = [], dateList }) => {
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  console.log(dataPomodoro);

  const getCurrentDatasets = () => {
    return {
      labels: dateList.map((data) => {
        return formatDate(data);
      }),
      datasets: [
        {
          label: "Total Tugas Selesai",
          data: dateList.map((date) => {
            const filteredDataByDate = dataPomodoro?.filter((data) => {
              const getData =
                formatDate(data.waktu_pengerjaan) === formatDate(date);
              return getData;
            });
            return filteredDataByDate.length;
          }),
        },
      ],
    };
  };

  return (
    <Bar
      data={getCurrentDatasets()}
      options={{
        ...defaulOption,
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default TotalTugasSelesai;
