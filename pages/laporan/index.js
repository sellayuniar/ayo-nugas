import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Laporan = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;
  // const [dataTugas, setDataTugas] = useState({
  //   labels: semuaTugas.map((data) =>
  //     moment(data.waktuPengerjaan).format("DD/MM/YYYY")
  //   ),
  //   datasets: [
  //     {
  //       label: "total pomodoro",
  //       data: semuaTugas.map((data) => data.real),
  //     },
  //   ],
  // });
  const [dataTugas, setDataTugas] = useState({
    labels: [2000, 2003, 2004],
    datasets: [
      {
        label: "total pomodoro",
        data: [100, 200, 100],
      },
    ],
  });

  console.log(semuaTugas);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  useEffect(() => {
    getDataTugas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-semibold">Laporan</h1>
        <div className="mt-5 flex flex-col">
          <div className="flex justify-between">
            <div className="flex">
              <button>Unduh PDF</button>
              <button>Kirim Ke Email</button>
            </div>
            <div>
              <span>26 Juni - 02 Juli 2023 </span>
            </div>
          </div>
          {/* data total */}
          <div className="my-10">
            <div>
              <h3> Total Pomodoro </h3>
              <p> 40 </p>
            </div>
          </div>

          {/* grafik */}
          <div className="h-full w-full rounded-lg bg-white shadow-lg">
            <Bar
              data={dataTugas}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>

          {/* tutup container */}
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
