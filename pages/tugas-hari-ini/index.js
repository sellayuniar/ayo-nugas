import React from "react";
import Layout from "@/widget/Layout";

const TugasHariIni = () => {
  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">Tugas Hari ini</h1>

        <div className="mt-5 w-full">
          <div className="h-72 w-2/4 rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <span className="text-xl font-bold">
                <h2>Pomodoro</h2>
              </span>
              <span>
                <h2>Istirahat Pendek</h2>
              </span>
              <span>
                <h2>Istirahat Panjang</h2>
              </span>
            </div>
            <div className="mt-16 flex justify-center ">
              <p className="text-4xl font-bold">25:00</p>
            </div>
            <div>
              <div className="mt-8 flex justify-center ">
                <button className=" rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md">
                  Mulai
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex justify-between">
            <button className="text-md rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg">
              Tambah Tugas
            </button>
            <button className="">Urutkan Berdasarkan Status</button>
          </div>

          <table className="w-full table-auto rounded-xl bg-white py-10 shadow-lg">
            <thead className="mx-3 border-b-4">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Judul Tugas
                </th>
                <th scope="col" className="px-6 py-3">
                  Waktu Pengerjaan
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Estimasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Real
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-sky-200">
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="flex px-6 py-3">
                  <span
                    className="hover: mr-2 h-8 w-8 cursor-pointer
                    hover:text-sky-500"
                  ></span>
                  <span className="h-8 w-8 cursor-pointer hover:text-red-500"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TugasHariIni;
