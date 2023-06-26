import ImgGagal from "@/assets/ImgSvg/ImgGagal";
import { Button, Modal } from "flowbite-react";

export default function ModalGagal({ modalProps }) {
  const { openModal, setOpenModal, errMsg } = modalProps;
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
            <ImgGagal />
            <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {errMsg}
            </h3>
            <div className="gap-4">
              <Button color="failure" onClick={() => setOpenModal(undefined)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
