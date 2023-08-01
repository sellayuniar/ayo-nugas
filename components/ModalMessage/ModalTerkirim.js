import ImgSukses from "@/assets/ImgSvg/imgSukses";
import { Button, Modal } from "flowbite-react";

export default function ModalTerkirim({ modalTerkirimProps }) {
  const { openModal, setOpenModal, pesan } = modalTerkirimProps;

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal show={openModal === true} size="md" popup onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <ImgSukses />
            <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
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
