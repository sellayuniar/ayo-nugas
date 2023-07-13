import React from "react";
import { Doughnut, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";
import ChartDataLabels from "chartjs-plugin-datalabels";

const TotalKategoriSelesai = ({ dataPomodoro = [] }) => {
  const removeDuplicatesLabels = (data) => {
    let uniqueLabels = [];

    data?.forEach((c) => {
      if (!uniqueLabels.includes(c.kategori_tugas)) {
        uniqueLabels.push(c.kategori_tugas);
      }
    });

    return uniqueLabels;
  };

  const sortDuplicatesData = (data) => {
    let uniqueDatas = [];

    data?.forEach((c) => {
      if (!uniqueDatas.includes(c.kategori_tugas)) {
        uniqueDatas.push(c);
      }
    });

    return uniqueDatas;
  };

  const dataChart = dataPomodoro.map((data) => {
    const dataKategori = data.kategori_tugas;
    const filteredData = dataPomodoro.filter((kategori) => {
      return kategori.kategori_tugas === dataKategori;
    });
    const sortDuplicate = sortDuplicatesData(filteredData);
    return sortDuplicate;
  });

  const removeDuplicates = (arr = []) => {
    const map = new Map();
    arr.forEach((x) => map.set(JSON.stringify(x), x));
    arr = [...map.values()];
    return arr;
  };

  const getCurrentDatasets = () => {
    return {
      labels: removeDuplicatesLabels(dataPomodoro),
      datasets: [
        {
          label: "Total Waktu Fokus",
          data: removeDuplicates(dataChart).map((data) => {
            let total = 0;
            data.forEach((item) => {
              total += parseInt(item.real);
            });
            return (total * 25) / 60;
          }),
          backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
        },
      ],
    };
  };

  const options = {
    ...defaulOption,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
      datalabels: {
        formatter: (value, context) => {
          const datapoints = context.chart.data.datasets[0].data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }

          const totalValue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalValue) * 100).toFixed(2);

          return `${percentageValue}%`;
        },
        color: "#fff",
      },
    },
  };

  return (
    <Doughnut
      data={getCurrentDatasets()}
      options={options}
      plugins={[ChartDataLabels]}
    />
  );
};

export default TotalKategoriSelesai;
