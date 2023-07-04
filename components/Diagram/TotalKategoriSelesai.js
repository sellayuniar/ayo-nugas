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
          label: "Total Tugas Selesai",
          data: removeDuplicates(dataChart).map((data) => {
            return data.length;
          }),
        },
      ],
    };
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
