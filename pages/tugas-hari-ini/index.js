import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import Edit from "@/assets/icons/Edit";
import Play from "@/assets/icons/Play";
import ModalTugas from "@/components/Modal/ModalTambahTugas";
import ModalRincian from "@/components/Modal/ModalRincianTugas";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import PomodoroTimer from "@/components/PomodoroTimer";

const TugasHariIni = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRincian, setOpenModalRincian] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [idTugas, setIdTugas] = useState("");
  const [idPomodoro, setIdPomodoro] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;

  useEffect(() => {
    getDataTugas();
    getDataTugasHariIni();

    if (fetchStatus) {
      getDataTugas();
      setFetchStatus(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus, setFetchStatus]);

  const getDataTugasHariIni = () => {
    const today = moment().format("YYYY-MM-DD");
    const waktuPengerjaanFormat = (date) => {
      return moment(date).format("YYYY-MM-DD");
    };
    const filterTugasByDate = semuaTugas.filter((data) =>
      waktuPengerjaanFormat(data.waktu_pengerjaan).includes(today)
    );

    return filterTugasByDate;
  };

  const sortTugasHariIni = getDataTugasHariIni().sort((a, b) => {
    return new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan);
  });

  const formatDateTime = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const handleModalRincian = (idTugas) => {
    setIdTugas(idTugas);
    setOpenModalRincian(true);
  };

  const handlePlay = (idTugas, idPomodoro) => {
    setIdTugas(idTugas);
    setIdPomodoro(idPomodoro)
    setIsPlay(true);
  };

  const propsTambahTugas = {
    openModal,
    setOpenModal,
    setFetchStatus,
  };

  const propsRincianTugas = {
    openModalRincian,
    setOpenModalRincian,
    setFetchStatus,
    idTugas,
  };

  const propsPomodoroTimer = {
    idPomodoro,
    idTugas,
    setFetchStatus,
    isPlay,
    setIsPlay,
  };
  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">Tugas Hari ini</h1>

        <div className="mt-5 w-full">
          {/* timer */}
          <div className="h-80 w-2/4 rounded-lg bg-white p-5 shadow-lg">
            <PomodoroTimer propsPomodoroTimer={propsPomodoroTimer} />
          </div>
          <div></div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex justify-between">
            <div>
              <button
                className="text-md rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737]"
                onClick={() => setOpenModal(true)}
              >
                Tambah Tugas
              </button>
              <ModalTugas propsTambahTugas={propsTambahTugas} />
            </div>
            <button className=" rounded-lg bg-white px-8 py-2  shadow-lg">
              Urutkan Berdasarkan Status
            </button>
          </div>

          {/* tabel */}
          <div className="relative overflow-x-auto">
            <table className="w-full rounded-xl bg-white py-12 text-left shadow-lg">
              <thead className="border-b-4 pt-3">
                <tr className="px-2 py-3">
                  <th scope="col" className=" w-10 px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="w-64 px-6 py-3">
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
                {sortTugasHariIni.map((data, idx) => (
                  <tr
                    className="border-b-2 px-2 hover:bg-red-200"
                    key={data.id}
                  >
                    <td scope="col" className=" px-6 py-3">
                      {idx + 1}
                    </td>
                    <td scope="col" className="w-64 px-6 py-3">
                      {data.judul_tugas}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {formatDateTime(data.waktu_pengerjaan)}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {data.status}
                    </td>
                    <td scope="col" className="px-6 py-3 text-center">
                      {data.estimasi}
                    </td>
                    <td scope="col" className="px-6 py-3 text-center">
                      {data.real === "" ? "0" : data.real}
                    </td>
                    <td scope="col" className="flex px-6 py-3">
                      <span
                        className="hover: mr-2 h-8 w-8 cursor-pointer
                    text-[#EE3D3D] hover:text-[#d63737]"
                        onClick={() => {
                          handleModalRincian(data.id);
                        }}
                      >
                        <Edit />
                      </span>
                      <span
                        className="h-8 w-8 cursor-pointer text-[#EE3D3D] hover:text-[#d63737]"
                        onClick={() => {
                          handlePlay(data.id, data.id_pomodoro);
                        }}
                      >
                        <Play />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalRincian propsRincianTugas={propsRincianTugas} />
        </div>
      </div>
    </Layout>
  );
};

export default TugasHariIni;
