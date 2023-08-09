import { Modal } from "flowbite-react";
import { db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import ModalSuksesHapusAkun from "./ModalSuksesHapusAkun";
import { useState } from "react";
import Spinner from "../Spinner";
import { useRouter } from "next/router";

export default function ModalKonfirmasiHapusAkun({ modalHapusAkunProps }) {
  const {
    loading,
    setLoading,
    openModalHapus,
    setOpenModalHapus,
    deleteDoc,
    deleteUser,
    dataUser,
    currentUser,
  } = modalHapusAkunProps;
  const [pesan, setPesan] = useState("");
  const [modalBerhasil, setModalBerhasil] = useState(false);

  const modalSuksesProps = {
    modalBerhasil,
    setModalBerhasil,
    pesan,
  };

  const handleDelete = () => {
    setLoading(true);
    deleteUser(currentUser)
      .then(() => {
        const akunDocRef = doc(db, "pengguna", dataUser.idDoc || "");
        deleteDoc(akunDocRef);
        setPesan("Akun anda berhasil dihapus!");
        setOpenModalHapus(false);
        setModalBerhasil(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        show={openModalHapus === true}
        size="md"
        popup
        onClose={() => setOpenModalHapus(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className="mb-5">
              <h3 className="my-5 text-lg font-normal text-[#404040]">
                Apakah kamu yakin untuk menghapus akun?
              </h3>
              <p className="text-sm text-[#888888] ">
                Semua data yang berkaitan dengan akunmu akan dihapus secara
                permanen dan kamu tidak bisa melihatnya lagi
              </p>
            </div>

            <div className="mt-4 flex">
              <span
                className=" mr-10  flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050] hover:border-[#d63737] hover:text-[#d63737]"
                onClick={() => setOpenModalHapus(undefined)}
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
      <ModalSuksesHapusAkun modalSuksesProps={modalSuksesProps} />
    </>
  );
}
