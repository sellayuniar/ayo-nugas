import React from "react";
import { Bar, defaulOption } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import moment from "moment";

const RangeWaktuFokus = ({ dataPomodoro = [], dateList }) => {
  //bentuk chartnya stack waterfall chart

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const formatTimestamp = (time) => {
    if (time) return moment(time).format("HH:mm");
  };

  const dataset = [
    {
      label: "Starting",
      time: "10:00",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Step 1",
      time: "10:15",
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
    {
      label: "Step 2",
      time: "10:30",
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
    {
      label: "Step 3",
      time: "11:00",
      backgroundColor: "rgba(255, 206, 86, 0.6)",
    },
    {
      label: "Ending",
      time: "12:00",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ];

  const convertedData = dataset.map((item) => {
    const [hours, minutes] = item.time.split(":");
    return {
      label: item.label,
      value: parseInt(hours) * 60 + parseInt(minutes),
      backgroundColor: item.backgroundColor,
    };
  });

  const chartData = {
    labels: convertedData.map((item) => item.label),
    datasets: [
      {
        data: convertedData.map((item) => item.value),
        backgroundColor: convertedData.map((item) => item.backgroundColor),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    legend: {
      display: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  // const dataChart = dateList.map((date) => {
  //   const filteredDataByDate = dataPomodoro?.filter((data) => {
  //     const getData = formatDate(data.waktu_pengerjaan) === formatDate(date);
  //     return getData;
  //   });
  //   const dataWaktu = [];
  //   filteredDataByDate?.forEach((waktu) => {
  //     dataWaktu.push([
  //       formatTimestamp(waktu.waktu_pengerjaan_real),
  //       formatTimestamp(waktu.waktu_pengerjaan_selesai),
  //     ]);
  //   });

  //   return dataWaktu;
  // });

  // const options = {
  //   responsive: true,
  //   scales: {
  //     y: [
  //       {
  //         type: "time",
  //         time: {
  //           unit: "hour",
  //           displayFormats: {
  //             hour: "HH:mm",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

  // const getCurrentDatasets = () => {
  //   return {
  //     labels: ["2023-09-20", "2023-09-20"],
  //     datasets: [
  //       {
  //         label: "Range Chart Waktu fokus",
  //         data: [new Date(1688286262514), new Date(1688287250899)],
  //       },
  //     ],
  //   };
  // };

  // var result = [
  //   { x: "18:00", y: "230" },
  //   { x: "19:00", y: "232" },
  //   { x: "20:00", y: "236" },
  //   { x: "22:00", y: "228" },
  // ];
  // var labels = result.map((e) => moment(e.x, "HH:mm"));
  // var data = result.map((e) => +e.y);
  // const getCurrentDatasets = () => {
  //   return {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Voltage Fluctuation",
  //         data: data,
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // };

  // console.log(getCurrentDatasets());

  return <Bar data={chartData} options={chartOptions} />;
};

export default RangeWaktuFokus;
