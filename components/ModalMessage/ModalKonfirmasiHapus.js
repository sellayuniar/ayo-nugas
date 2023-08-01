import ImgGagal from "@/assets/ImgSvg/ImgGagal";
import { Button, Modal } from "flowbite-react";
import { db } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ModalPesanSukses from "./ModalPesanSukses";
import { useState } from "react";
import Spinner from "../Spinner";

export default function ModalKonfirmasiHapus({ modalHapusProps }) {
  const {
    loading,
    openModal,
    setOpenModal,
    idTugas,
    setLoading,
    setFetchStatus,
    setOpenModalRincian,
    dataTugas,
  } = modalHapusProps;
  const [pesan, setPesan] = useState("");
  const [modalBerhasil, setModalBerhasil] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const tugasDocRef = doc(db, "tugas", idTugas || "");
      await deleteDoc(tugasDocRef);
      setFetchStatus(true);
      setOpenModal(false);
      setLoading(false);
      setPesan(`Tugas ${dataTugas.judul} berhasil dihapus!`);
      setModalBerhasil(true);
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  const modalSuksesProps = {
    modalBerhasil,
    setModalBerhasil,
    setOpenModalRincian,
    setFetchStatus,
    pesan,
  };

  return (
    <>
      <Modal
        show={openModal === true}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-5">
              <h3 className="my-5 text-lg font-normal text-[#404040]">
                Apakah kamu yakin untuk menghapus tugas?
              </h3>
              <p className="text-sm text-[#888888] ">
                Semua data yang berkaitan dengan tugas {dataTugas.judul} akan
                dihapus secara permanen dan kamu tidak bisa melihatnya lagi
              </p>
            </div>

            <div className="mt-4 flex">
              <span
                className=" mr-10  flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050] hover:border-[#d63737] hover:text-[#d63737]"
                onClick={() => setOpenModal(undefined)}
              >
                Batal
              </span>
              <button
                className="h-10 w-36  rounded-full bg-[#F05050] font-semibold text-white shadow-md hover:bg-[#d63737]"
                onClick={handleDelete}
              >
                {loading ? <Spinner /> : "Yakin, hapus"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ModalPesanSukses modalSuksesProps={modalSuksesProps} />
    </>
  );
}
