import { Button, Modal } from "flowbite-react";
import Select from "react-select";
import { useState, useRef } from "react";
import {
  optionsTipe,
  optionsKategori,
  optionsStatus,
} from "@/data/dataSelectTugas";
import CloseBtn from "@/assets/icons/CloseBtn";
import { customStyles } from "@/styles/customStyles";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Cookies from "js-cookie";
import Spinner from "../Spinner";
import ModalTugasBerhasil from "../ModalMessage/ModalTugasBerhasil";

const ModalTambahTugas = ({ propsTambahTugas }) => {
  const { openModal, setOpenModal, setFetchStatus, tidakDirencanakanMendesak } =
    propsTambahTugas;
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
  const [loading, setLoading] = useState(false);
  const [modalBerhasil, setModalBerhasil] = useState(false);
  const uid_user = Cookies.get("uid_user");
  const email_user = Cookies.get("email");
  const tugasCollectionRef = collection(db, "tugas");
  const rootRef = useRef(null);

  const closeModal = () => {
    setDataTugas({
      judul: "",
      catatan: "",
      waktuPengerjaan: "",
      tipe: null,
      kategori: null,
      status: null,
      estimasi: 0,
      real: 0,
    });
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setDataTugas({ ...dataTugas, [e.target.name]: e.target.value });
  };

  const handleTambahTugas = async (e) => {
    e.preventDefault();
    setLoading(true);

    await addDoc(tugasCollectionRef, {
      uid: uid_user,
      email_user: email_user,
      judul_tugas: dataTugas.judul,
      catatan: dataTugas.catatan,
      waktu_pengerjaan: dataTugas.waktuPengerjaan,
      tipe_tugas: dataTugas.tipe,
      kategori_tugas: dataTugas.kategori,
      status: dataTugas.status,
      estimasi: dataTugas.estimasi,
      real: dataTugas.real === "" ? 0 : dataTugas.real,
      waktu_pengerjaan_real: "",
      waktu_pengerjaan_selesai: "",
      tidak_direncanakan_mendesak: tidakDirencanakanMendesak,
    });

    setModalBerhasil(true);
    setLoading(false);
  };

  const propsModalTugas = {
    setOpenModal,
    modalBerhasil,
    setModalBerhasil,
    setFetchStatus,
    setDataTugas,
  };

  return (
    <div ref={rootRef}>
      <Modal
        show={openModal === true}
        onClose={closeModal}
        size="4xl"
        position="top-center"
        root={rootRef.current ?? undefined}
        className="h-[1500px] md:h-full"
      >
        {/* <Modal.Header /> */}
        <Modal.Body>
          <div className="px-5 pb-24 pt-5 text-[#404040]">
            <div className="mb-5 flex justify-between">
              <h1 className="text-xl font-bold">Tambah Tugas</h1>
              <span
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F05050]"
                onClick={closeModal}
              >
                <CloseBtn />
              </span>
            </div>
            <div>
              <form className="flex flex-col" onSubmit={handleTambahTugas}>
                <div className="mb-5 flex flex-col">
                  <label className="font-semibold"> Judul Tugas</label>
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
                </div>

                <div className="mb-5 flex flex-col">
                  <label className="font-semibold">Catatan</label>
                  <textarea
                    name="catatan"
                    className="mt-2 h-32 rounded-lg border-gray-200  focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                    placeholder="contoh: membuat format makalah"
                    value={dataTugas.catatan}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-5 flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="flex flex-col">
                    <label className="font-semibold">Waktu Pengerjaan</label>
                    <input
                      name="waktuPengerjaan"
                      type="datetime-local"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                      value={dataTugas.waktuPengerjaan}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Tipe Tugas</label>
                    <div className="w-full md:w-[200px] lg:w-[230px]">
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
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Kategori Tugas</label>
                    <div className="w-full md:w-[200px] lg:w-[230px]">
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
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Status</label>
                    <div className="w-full md:w-[200px] lg:w-[230px]">
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
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Estimasi</label>
                    <input
                      name="estimasi"
                      type="number"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                      placeholder="contoh: 1"
                      value={dataTugas.estimasi === 0 ? "" : dataTugas.estimasi}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Real</label>
                    <input
                      name="real"
                      type="number"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] md:w-[200px] lg:w-[230px]"
                      placeholder="contoh: 1"
                      value={dataTugas.real}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
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
                    {loading ? <Spinner /> : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer/> */}
        <ModalTugasBerhasil propsModalTugas={propsModalTugas} />
      </Modal>
    </div>
  );
};

export default ModalTambahTugas;
