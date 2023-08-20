import React, { useEffect, useState, useContext } from "react";
import Layout from "@/widget/Layout";
import Edit from "@/assets/icons/Edit";
import ModalTugas from "@/components/Modal/ModalTambahTugas";
import ModalRincian from "@/components/Modal/ModalRincianTugas";
import { GlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import Plus from "@/assets/icons/Plus";
import Calender from "@/assets/icons/Calender";
import CloseBtn from "@/assets/icons/CloseBtn";
import PrevArrow from "@/assets/icons/PrevArrow";
import AfterArrow from "@/assets/icons/AfterArrow";
import styles from "./index.module.css";
import { formatDateWithFullDay, formatDateWithDay } from "@/utils/dateUtils";

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
  const [keywords, setKeywords] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

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

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handleModalRincian = (idTugas) => {
    setIdTugas(idTugas);
    setOpenModalRincian(true);
  };

  const filteredData = sortTugas.filter((data) =>
    data.judul_tugas.toLowerCase().includes(keywords?.toLowerCase())
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredDataWithDate = filteredData.filter((data) =>
    selectedDate
      ? formatDate(data.waktu_pengerjaan) === formatDate(selectedDate)
      : true
  );

  //pagination
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredDataWithDate.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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

  return (
    <>
      <Layout>
        <div className="mx-5 mb-32 mt-5">
          <div className="flex flex-col justify-between md:flex-row">
            <h1 className="mb-3 text-3xl font-bold text-[#404040]">
              Inventaris Tugas
            </h1>
            <div>
              <div className="flex w-72 items-center justify-between rounded-lg bg-white px-4 py-2 shadow-md">
                <div className="flex items-center ">
                  <span className="mr-2 h-8 w-8">
                    <Calender />
                  </span>
                  <label
                    htmlFor="filterDate"
                    className="text-md cursor-pointer font-semibold text-[#EE3D3D]"
                  >
                    {selectedDate
                      ? formatDateWithFullDay(selectedDate)
                      : "Saring Berdasarkan Tanggal"}
                  </label>
                </div>
                {selectedDate !== null && (
                  <span
                    onClick={() => setSelectedDate(null)}
                    className="cursor-pointer"
                  >
                    <CloseBtn color="#EE3D3D" />
                  </span>
                )}
              </div>

              <DatePicker
                id="filterDate"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                className="hidden w-[150px] border-none"
                placeholder="pilih tanggal"
              />
            </div>
          </div>

          <div>
            <div className="mb-5 mt-2">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <button
                  className="text-md mb-5 flex items-center rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737] md:mb-0"
                  onClick={() => setOpenModal(true)}
                >
                  <span className="mr-2 h-7 w-7">
                    <Plus />
                  </span>
                  Tambah Tugas
                </button>
                <div className="relative lg:ml-5">
                  <input
                    type="text"
                    className="h-12 w-full rounded-lg border-none ring-0 focus:ring-0 md:w-[500px] lg:w-[550px] xl:w-[850px]"
                    value={keywords}
                    placeholder="Masukan kata kunci..."
                    onChange={(e) => {
                      setKeywords(e.target.value);
                    }}
                  />
                  <button className="absolute right-0 h-12 w-20 rounded-lg bg-[#F16464] text-white hover:bg-[#d63737]">
                    Cari
                  </button>
                </div>
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
                    <th scope="col" className="px-6 py-3 text-center">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Estimasi
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Real
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataWithDate.length >= 1 ? (
                    filteredDataWithDate
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((data, idx) => (
                        <tr
                          className="border-b-2 px-2 hover:bg-rose-100"
                          key={data.id}
                        >
                          <td
                            scope="col"
                            className={`${
                              formatDate(data.waktu_pengerjaan) ===
                                formatDate(moment()) &&
                              "font-semibold text-slate-700"
                            } px-6 py-3 `}
                          >
                            {pageNumber >= 1
                              ? (pageNumber + 1) * usersPerPage + idx + 1
                              : idx + 1}
                          </td>
                          <td
                            scope="col"
                            className={`${
                              formatDate(data.waktu_pengerjaan) ===
                                formatDate(moment()) &&
                              "font-semibold text-slate-700"
                            } w-64 px-6 py-3`}
                          >
                            {data.judul_tugas}
                          </td>
                          <td
                            scope="col"
                            className={`${
                              formatDate(data.waktu_pengerjaan) ===
                                formatDate(moment()) &&
                              "font-semibold text-slate-700"
                            } px-6 py-3 `}
                          >
                            {formatDateWithFullDay(data.waktu_pengerjaan)}
                          </td>
                          <td
                            scope="col"
                            className={`" }
                          px-6 py-3 font-semibold `}
                          >
                            <p
                              className={` ${
                                data.status === "Belum Dikerjakan"
                                  ? "p-2 text-center text-red-500 xl:rounded-full xl:bg-rose-50"
                                  : data.status === "Sedang Dikerjakan"
                                  ? "p-2 text-center text-orange-500 xl:rounded-full xl:bg-orange-50"
                                  : "p-2 text-center text-green-500 xl:rounded-full xl:bg-green-50"
                              }`}
                            >
                              {data.status}
                            </p>
                          </td>
                          <td
                            scope="col"
                            className={`${
                              formatDate(data.waktu_pengerjaan) ===
                                formatDate(moment()) &&
                              "font-semibold text-slate-700"
                            } px-6 py-3 text-center`}
                          >
                            {data.estimasi}
                          </td>
                          <td
                            scope="col"
                            className={`${
                              formatDate(data.waktu_pengerjaan) ===
                                formatDate(moment()) &&
                              "font-semibold text-slate-700"
                            } px-6 py-3 text-center`}
                          >
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
                      ))
                  ) : filteredData.length < 1 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        Data tugas belum ditambahkan!
                      </td>
                    </tr>
                  ) : filteredDataWithDate < 1 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        Data tugas tidak ditemukan!
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-10 text-center">
                        Belum ada tugas yang ditambahkan!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex items-end justify-end">
              <ReactPaginate
                previousLabel={<PrevArrow />}
                nextLabel={<AfterArrow />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={styles.pagination}
                disabledClassName={styles.disabledPage}
                previousLinkClassName={`${styles.item} ${styles.previous}`}
                pageClassName={`${styles.item} ${styles.paginationPage}`}
                nextLinkClassName={`${styles.item} ${styles.next}`}
                activeClassName={`${styles.item} ${styles.active}`}
                breakClassName={`${styles.item} ${styles.breakMe}`}
                // activeClassName="text-[#F16464]"
                // pageLinkClassName="bg-white mx-2 px-5 py-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </Layout>
      <ModalTugas propsTambahTugas={propsTambahTugas} />
      <ModalRincian propsRincianTugas={propsRincianTugas} />
    </>
  );
};

export default InventarisTugas;
