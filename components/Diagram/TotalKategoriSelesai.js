import React from "react";
import { Doughnut, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";

const TotalKategoriSelesai = ({ dataPomodoro = [] }) => {
  //cara dapatin data per category
  //misal minggu ini kategori mengarang (2)
  // [{kategori: mengarang} {kategori: mengarang} {kategori: belajar}]
  //data akhir mengarang(2) belajar(1)

  const removeDuplicatesLabels = (data) => {
    let uniqueLabels = [];

    data?.forEach((c) => {
      if (!uniqueLabels.includes(c.kategori_tugas)) {
        uniqueLabels.push(c.kategori_tugas);
      }
    });

    return uniqueLabels;
  };

  console.log(removeDuplicatesLabels());

  const getCurrentDatasets = () => {
    return {
      labels: removeDuplicatesLabels(dataPomodoro),
      datasets: [
        {
          label: "Total Kategori",
          data: dataPomodoro.map((data) => {
            const dataKategori = data.kategori_tugas;
            const filteredData = dataPomodoro?.filter((kategori) => {
              console.log(dataKategori, kategori.kategori_tugas);
              return kategori.kategori_tugas === dataKategori;
            });

            console.log(filteredData);

            return filteredData.length;
          }),
        },
      ],
    };
    console.log(labels);
  };

  return (
    <Doughnut
      data={getCurrentDatasets()}
      options={{
        ...defaulOption,
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default TotalKategoriSelesai;
