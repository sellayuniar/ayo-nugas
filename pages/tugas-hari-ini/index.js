import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import Edit from "@/assets/icons/Edit";
import Play from "@/assets/icons/Play";
import ModalTugas from "@/components/Modal/ModalTambahTugas";
import ModalRincian from "@/components/Modal/ModalRincianTugas";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import Clock from "@/components/Clock.js";
import PomodoroTimer from "@/components/PomodoroTimer";
import TableTugasHariIni from "@/components/Datatables/TableTugasHariIni";
import TableTugasTidakDirencanakanMendesak from "@/components/Datatables/TableTugasTidakDirencanakanMendesak";
import Weather from "@/components/Weather";
import Plus from "@/assets/icons/Plus";

const TugasHariIni = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRincian, setOpenModalRincian] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [idTugas, setIdTugas] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  const [tidakDirencanakanMendesak, setTidakDirencanakanMendesak] =
    useState(false);
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas, loading } = state;
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

  console.log(semuaTugas);

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

  const getDataTugasUtama = getDataTugasHariIni().filter((data) => {
    return data.tidak_direncanakan_mendesak === false;
  });

  const sortTugasHariIni = getDataTugasUtama.sort((a, b) => {
    return new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan);
  });

  const formatDateTime = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const getTugasTidakDirencanakanMendesak = getDataTugasHariIni().filter(
    (data) => {
      return data.tidak_direncanakan_mendesak === true;
    }
  );

  const sortTugasTidakDirencanakanMendesak =
    getTugasTidakDirencanakanMendesak.sort((a, b) => {
      return new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan);
    });

  const handleModalRincian = (idTugas) => {
    setIdTugas(idTugas);
    setOpenModalRincian(true);
  };

  const handlePlay = (idTugas) => {
    setIdTugas(idTugas);
    setIsPlay(true);
  };

  const handleTidakDirencanakan = () => {
    setTidakDirencanakanMendesak(true);
    setOpenModal(true);
  };

  const propsTambahTugas = {
    openModal,
    setOpenModal,
    setFetchStatus,
    tidakDirencanakanMendesak,
    setTidakDirencanakanMendesak,
  };

  const propsRincianTugas = {
    openModalRincian,
    setOpenModalRincian,
    setFetchStatus,
    idTugas,
  };

  const propsPomodoroTimer = {
    idTugas,
    setFetchStatus,
    isPlay,
    setIsPlay,
    setIdTugas,
  };

  const propsTugasUtamaHariIni = {
    sortTugasHariIni,
    formatDateTime,
    handlePlay,
    handleModalRincian,
  };

  const propsTugasTidakDirencakanMendesak = {
    sortTugasTidakDirencanakanMendesak,
    formatDateTime,
    handlePlay,
    handleModalRincian,
  };

  return (
    <Layout>
      <div className="mx-5 mb-10 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">Tugas Hari ini</h1>
        <div className="mt-10 flex w-full flex-col-reverse lg:flex-row">
          {/* timer */}
          <div className="mt-5 h-[400px] w-full rounded-lg bg-white p-5 shadow-lg md:h-[350px] lg:mt-0 lg:w-3/4 ">
            <PomodoroTimer propsPomodoroTimer={propsPomodoroTimer} />
          </div>
          <div className="flex flex-col">
            <div className="lg:w- mb-10 h-32 w-full rounded-lg bg-white p-5  shadow-lg lg:ml-5">
              <Clock />
            </div>
            <div className="h-32 w-full rounded-lg bg-white p-5 shadow-lg lg:ml-5 lg:w-full">
              <Weather />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex justify-between">
            <div>
              <button
                className="text-md flex items-center rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737]"
                onClick={() => setOpenModal(true)}
              >
                <span className="mr-2 h-7 w-7">
                  <Plus />
                </span>
                Tambah Tugas
              </button>
              <ModalTugas propsTambahTugas={propsTambahTugas} />
            </div>
          </div>

          {/* tabel */}
          <div className="relative overflow-x-auto">
            <TableTugasHariIni
              propsTugasUtamaHariIni={propsTugasUtamaHariIni}
            />
          </div>
          <ModalRincian propsRincianTugas={propsRincianTugas} />
        </div>
      </div>
      <hr className="mt-5 w-full border-4" />
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">
          Tugas Tidak Direncanakan dan Mendesak
        </h1>

        <div className="mt-5">
          <div className="mb-5 flex justify-between">
            <div>
              <button
                className="text-md flex items-center rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737]"
                onClick={handleTidakDirencanakan}
              >
                <span className="mr-2 h-7 w-7">
                  <Plus />
                </span>
                Tambah Tugas
              </button>
              <ModalTugas propsTambahTugas={propsTambahTugas} />
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <TableTugasTidakDirencanakanMendesak
              propsTugasTidakDirencakanMendesak={
                propsTugasTidakDirencakanMendesak
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TugasHariIni;
