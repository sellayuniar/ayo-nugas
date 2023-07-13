import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import Edit from "@/assets/icons/Edit";
import ModalTugas from "@/components/Modal/ModalTambahTugas";
import ModalRincian from "@/components/Modal/ModalRincianTugas";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InventarisTugas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRincian, setOpenModalRincian] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [idTugas, setIdTugas] = useState("");
  const [tidakDirencanakanMendesak, setTidakDirencanakanMendesak] =
    useState(false);
  const { state, handleFunctions } = useContext(GlobalContext);
  const { semuaTugas } = state;
  const { getDataTugas } = handleFunctions;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getDataTugas();

    if (fetchStatus) {
      getDataTugas();
      setFetchStatus(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus, setFetchStatus]);

  const sortTugas = semuaTugas.sort((a, b) => {
    const currentDate = new Date();
    if (
      new Date(a.waktu_pengerjaan).toDateString() === currentDate.toDateString()
    ) {
      return -1; // Place a at a lower index
    } else if (
      new Date(b.waktu_pengerjaan).toDateString() === currentDate.toDateString()
    ) {
      return 1; // Place a at a higher index
    } else if (
      new Date(a.waktu_pengerjaan) < currentDate &&
      new Date(b.waktu_pengerjaan) < currentDate
    ) {
      return new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan); // Sort past dates in ascending order
    } else if (
      new Date(a.waktu_pengerjaan) > currentDate &&
      new Date(b.waktu_pengerjaan) > currentDate
    ) {
      return new Date(a.waktu_pengerjaan) - new Date(b.waktu_pengerjaan); // Sort future dates in ascending order
    } else if (new Date(a.waktu_pengerjaan) < currentDate) {
      return 1; // Place past date (a) at a higher index
    } else if (new Date(b.waktu_pengerjaan) < new Date(currentDate)) {
      return -1; // Place past date (b) at a lower index
    }
  });

  const formatDateTime = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const handleModalRincian = (idTugas) => {
    setIdTugas(idTugas);
    setOpenModalRincian(true);
  };

  const propsTambahTugas = {
    openModal,
    setOpenModal,
    setFetchStatus,
    tidakDirencanakanMendesak,
  };

  const propsRincianTugas = {
    openModalRincian,
    setOpenModalRincian,
    setFetchStatus,
    idTugas,
  };

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">Inventaris Tugas</h1>

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
            <div className=" rounded-lg bg-white px-8 py-2  shadow-lg">
              <label htmlFor="filterDate">Filter by Date:</label>
              <DatePicker
                id="filterDate"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                className="w-[150px] border-none"
                placeholder="pilih tanggal"
              />
            </div>
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
                {sortTugas.map((data, idx) => (
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
                      {data.real}
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

export default InventarisTugas;
