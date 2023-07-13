import React from "react";
import { Bar, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";
import { formatDateWithDay, formatDate } from "@/utils/dateUtils";

const TotalWaktuFokus = ({ dataPomodoro = [], dateList }) => {
  const getCurrentDatasets = () => {
    return {
      labels: dateList.map((data) => {
        return formatDateWithDay(data);
      }),
      datasets: [
        {
          label: "Total Pomodoro",
          data: dateList.map((date) => {
            const filteredDataByDate = dataPomodoro?.filter((data) => {
              const getData =
                formatDate(data.waktu_pengerjaan) === formatDate(date);
              return getData;
            });

            let total = 0;
            filteredDataByDate.forEach((item) => {
              total += parseInt(item.real);
            });
            return total;
          }),
          backgroundColor: "#EE3D3D",
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
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export default TotalWaktuFokus;
