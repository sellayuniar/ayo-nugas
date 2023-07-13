import React from "react";
import { Line, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";
import { formatDateWithDay, formatDate } from "@/utils/dateUtils";

const TotalPomodoro = ({ dataPomodoro = [], dateList }) => {
  const getCurrentDatasets = () => {
    return {
      labels: dateList.map((data) => {
        return formatDateWithDay(data);
      }),
      datasets: [
        {
          label: "Total Waktu Fokus",
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
            return (total * 25) / 60;
          }),
          backgroundColor: "#EE3D3D",
          borderColor: "#EE3D3D",
        },
      ],
    };
  };

  const options = {
    ...defaulOption,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            console.log(tooltipItem);
            let label = "Total Waktu Fokus";
            let hours = Math.floor(tooltipItem.raw * 60);
            function toHours(totalMinutes) {
              const hours = Math.floor(totalMinutes / 60);

              return hours;
            }

            function toMinutes(totalMinutes) {
              const minutes = totalMinutes % 60;
              return minutes;
            }

            console.log(toHours(hours));
            return `${toHours(hours)} Jam ${toMinutes(hours)} menit`;
          },
        },
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
        beginAtZero: true,
        // ticks: {
        //   callbacks: (context, index) => {
        //     return "hello";
        //   },
        // },
      },
    },
  };

  return <Line data={getCurrentDatasets()} options={options} />;
};

export default TotalPomodoro;
