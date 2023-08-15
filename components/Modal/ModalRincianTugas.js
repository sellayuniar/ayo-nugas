/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal } from "flowbite-react";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import {
  optionsTipe,
  optionsKategori,
  optionsStatus,
} from "@/data/dataSelectTugas";
import CloseBtn from "@/assets/icons/CloseBtn";
import { customStyles } from "@/styles/customStyles";
import { db } from "@/config/firebase";
import { updateDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import moment from "moment";
import Spinner from "../Spinner";
import Trash from "@/assets/icons/Trash";
import ModalKonfirmasiHapus from "@/components/ModalMessage/ModalKonfirmasiHapus";
import ModalPesanSukses from "../ModalMessage/ModalPesanSukses";

const ModalUbahTugas = ({ propsRincianTugas }) => {
  const { openModalRincian, setOpenModalRincian, setFetchStatus, idTugas } =
    propsRincianTugas;
  const rootRef = useRef(null);
  const [dataTugas, setDataTugas] = useState({
    judul: "",
    catatan: "",
    waktuPengerjaan: "",
    tipe: "",
    kategori: "",
    status: "",
    estimasi: 0,
    real: 0,
  });
  const [ubahData, setUbahData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pesan, setPesan] = useState("");
  const [modalBerhasil, setModalBerhasil] = useState(false);

  const closeModal = () => {
    setOpenModalRincian(false);
    if (ubahData) {
      setUbahData(false);
    }
  };

  const handleChange = (e) => {
    setDataTugas({ ...dataTugas, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (idTugas) {
      getTugasById();
    }
  }, [idTugas]);

  const getTugasById = async () => {
    try {
      const tugasDocRef = doc(db, "tugas", idTugas || "");
      if (!idTugas) return false;
      const docSnap = await getDoc(tugasDocRef);
      const dataTugas = docSnap.data();
      setDataTugas({
        judul: dataTugas.judul_tugas || "",
        catatan: dataTugas.catatan || "",
        waktuPengerjaan: dataTugas?.waktu_pengerjaan || "",
        tipe: dataTugas.tipe_tugas || "",
        kategori: dataTugas.kategori_tugas || "",
        status: dataTugas.status || "",
        estimasi: dataTugas.estimasi || "",
        real: dataTugas.real,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUbahTugas = async (e) => {
    setLoading(true);
    const tugasDocRef = doc(db, "tugas", idTugas || "");
    e.preventDefault();
    await updateDoc(tugasDocRef, {
      judul_tugas: dataTugas.judul || "",
      catatan: dataTugas.catatan || "",
      waktu_pengerjaan: dataTugas.waktuPengerjaan || "",
      tipe_tugas: dataTugas.tipe || "",
      kategori_tugas: dataTugas.kategori || "",
      status: dataTugas.status || "",
      estimasi: dataTugas.estimasi || "",
      real: dataTugas.real,
    });
    setFetchStatus(true);
    setUbahData(false);
    setLoading(false);
    setPesan(`Tugas ${dataTugas.judul} Berhasil Diubah!`);
    setModalBerhasil(true);
  };

  const waktuPengerjaanFormat = (date) => {
    return moment(date).format("DD/MM/YY HH:mm");
  };

  const modalSuksesProps = {
    modalBerhasil,
    setModalBerhasil,
    setOpenModalRincian,
    setFetchStatus,
    pesan,
  };

  const modalHapusProps = {
    loading,
    openModal,
    setOpenModal,
    idTugas,
    setLoading,
    setFetchStatus,
    setOpenModalRincian,
    dataTugas,
  };

  return (
    <div ref={rootRef}>
      <Modal
        show={openModalRincian === true}
        onClose={closeModal}
        size="4xl"
        position="top-center"
        root={rootRef.current ?? undefined}
        className="h-full"
      >
        {/* <Modal.Header /> */}
        <Modal.Body>
          <div className="px-5 pb-24 pt-5 text-[#404040]">
            <div className="mb-5 flex justify-between">
              <h1 className="text-xl font-bold">
                {ubahData ? "Ubah" : "Rincian"} Tugas
              </h1>
              <span
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F05050]"
                onClick={closeModal}
              >
                <CloseBtn />
              </span>
            </div>
            <div>
              <form className="flex flex-col" onSubmit={handleUbahTugas}>
                <div className="mb-5 flex flex-col">
                  <label className="font-semibold"> Judul Tugas</label>

                  {ubahData ? (
                    <input
                      name="judul"
                      type="text"
                      className="mt-2 h-[50px] rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      ype="text"
                      id="judul"
                      onChange={(e) => {
                        setDataTugas({ ...dataTugas, judul: e.target.value });
                      }}
                      value={dataTugas.judul}
                      placeholder="contoh: Membuat Makalah"
                      required
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataTugas.judul}</p>
                    </div>
                  )}
                </div>

                <div className="mb-5 flex flex-col">
                  <label className="font-semibold">Catatan</label>
                  {ubahData ? (
                    <textarea
                      name="catatan"
                      className="mt-2 h-32 rounded-lg border-gray-200  focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: membuat format makalah"
                      value={dataTugas.catatan}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex h-32 rounded-lg border  border-gray-200 px-3 py-2 ">
                      <p>{dataTugas.catatan}</p>
                    </div>
                  )}
                </div>

                <div className="mb-5 flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">
                      Waktu Pengerjaan
                    </label>
                    {ubahData ? (
                      <input
                        name="waktuPengerjaan"
                        type="datetime-local"
                        className=" h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                        value={dataTugas?.waktuPengerjaan || ""}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                        <p>
                          {waktuPengerjaanFormat(dataTugas.waktuPengerjaan)}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Tipe Tugas</label>
                    <div className="w-full md:w-[200px] lg:w-[230px]">
                      {ubahData ? (
                        <Select
                          id="tipeTugas"
                          value={
                            dataTugas.tipe === null
                              ? "pilih tipe"
                              : { value: dataTugas.tipe, label: dataTugas.tipe }
                          }
                          styles={customStyles}
                          options={optionsTipe}
                          components={{ IndicatorSeparator: () => null }}
                          isSearchable={false}
                          onChange={(e) =>
                            setDataTugas({ ...dataTugas, tipe: e.label })
                          }
                          placeholder="pilih tipe..."
                          required
                        />
                      ) : (
                        <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                          <p>{dataTugas.tipe}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Kategori Tugas</label>
                    <div className="w-full md:w-[200px] lg:w-[230px]">
                      {ubahData ? (
                        <Select
                          id="kategoriTugas"
                          value={
                            dataTugas.kategori === null
                              ? "pilih kategori"
                              : {
                                  value: dataTugas.kategori,
                                  label: dataTugas.kategori,
                                }
                          }
                          styles={customStyles}
                          options={optionsKategori}
                          components={{ IndicatorSeparator: () => null }}
                          isSearchable={false}
                          onChange={(e) =>
                            setDataTugas({ ...dataTugas, kategori: e.label })
                          }
                          placeholder="pilih kategori..."
                          escapeClearsValue={true}
                          required
                        />
                      ) : (
                        <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                          <p>{dataTugas.kategori}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-10 flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Status</label>
                    <div className="mt-2 w-full md:w-[200px] lg:w-[230px]">
                      {ubahData ? (
                        <Select
                          id="kategoriTugas"
                          value={
                            dataTugas.status === null
                              ? "pilih status"
                              : {
                                  value: dataTugas.status,
                                  label: dataTugas.status,
                                }
                          }
                          styles={customStyles}
                          options={optionsStatus}
                          components={{ IndicatorSeparator: () => null }}
                          isSearchable={false}
                          onChange={(e) =>
                            setDataTugas({ ...dataTugas, status: e.label })
                          }
                          placeholder="pilih status..."
                          required
                        />
                      ) : (
                        <div className="flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                          <p>{dataTugas.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold ">
                      Estimasi Pomodoro
                    </label>
                    {ubahData ? (
                      <input
                        name="estimasi"
                        type="number"
                        className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                        placeholder="contoh: 1"
                        value={dataTugas.estimasi}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                        <p>{dataTugas.estimasi}</p>
                      </div>
                    )}
                    <p className="ml-2 mt-1 text-xs text-orange-500">
                      *1 Pomodoro = 25 Menit
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold ">Real Pomodoro</label>
                    {ubahData ? (
                      <input
                        name="real"
                        type="number"
                        className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                        placeholder="contoh: 1"
                        value={dataTugas.real}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3 md:w-[200px] lg:w-[230px]">
                        <p>{dataTugas.real}</p>
                      </div>
                    )}
                  </div>
                </div>

                {ubahData ? (
                  <div className="mt-5 flex items-center justify-end">
                    <span
                      onClick={closeModal}
                      className="mx-5 flex  h-12 w-56 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050]"
                    >
                      Batal
                    </span>

                    <button
                      className="h-12 w-56  rounded-full bg-[#F05050] font-semibold text-white shadow-md"
                      type="submit"
                    >
                      {loading ? <Spinner /> : "Simpan Perubahan"}
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 flex items-center justify-between">
                    <span
                      onClick={() => {
                        setOpenModal(true);
                      }}
                      className="mx-3  flex h-12 w-56 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050]"
                    >
                      <span className="mr-2 h-7 w-7">
                        <Trash />
                      </span>
                      Hapus Data
                    </span>
                    <span
                      onClick={() => {
                        setUbahData(true);
                      }}
                      className="flex  h-12 w-56 cursor-pointer items-center justify-center rounded-full bg-[#F05050] font-semibold text-white hover:bg-[#d63737]"
                    >
                      Ubah Data
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </Modal.Body>
        <ModalKonfirmasiHapus modalHapusProps={modalHapusProps} />
        <ModalPesanSukses modalSuksesProps={modalSuksesProps} />
        {/* <Modal.Footer/> */}
      </Modal>
    </div>
  );
};

export default ModalUbahTugas;
