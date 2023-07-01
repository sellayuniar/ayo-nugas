import React from "react";
import { Bar, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";

const TotalWaktuFokus = ({ dataPomodoro = [], dateList }) => {
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const getCurrentDatasets = () => {
    return {
      labels: dateList.map((data) => {
        return formatDate(data);
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

            console.log(filteredDataByDate);

            let total = 0;
            filteredDataByDate.forEach((item) => {
              total += parseInt(item.real);
            });
            return total;
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

export default TotalWaktuFokus;
