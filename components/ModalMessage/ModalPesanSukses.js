import ImgSukses from "@/assets/ImgSvg/imgSukses";
import { Button, Modal } from "flowbite-react";

export default function ModalPesanSukses({ modalSuksesProps }) {
  const {
    modalBerhasil,
    setModalBerhasil,
    setOpenModalRincian,
    setFetchStatus,
    pesan,
  } = modalSuksesProps;

  const handleClose = () => {
    setFetchStatus(true);
    setOpenModalRincian(false);
    setModalBerhasil(false);
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
            <h3 className="my-5 text-center text-lg font-normal text-[#404040] ">
              {pesan}
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
