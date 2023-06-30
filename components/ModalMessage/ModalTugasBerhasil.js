import ImgSukses from "@/assets/ImgSvg/imgSukses";
import { Button, Modal } from "flowbite-react";

export default function ModalTugasBerhasil({ propsModalTugas }) {
  const {
    setOpenModal,
    modalBerhasil,
    setModalBerhasil,
    setFetchStatus,
    setDataTugas,
  } = propsModalTugas;

  const handleClose = () => {
    setFetchStatus(true);
    setModalBerhasil(false);
    setOpenModal(false);
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
  };

  return (
    <>
      <Modal
        show={modalBerhasil === true}
        size="md"
        popup
        onClose={handleClose}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <ImgSukses />
            <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tugas Berhasil ditambahkan!
            </h3>
            <div className="gap-4">
              <Button color="failure" onClick={handleClose}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
