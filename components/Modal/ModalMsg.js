"use client";

import { Button, Modal } from "flowbite-react";

export default function PopUpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => props.setOpenModal("pop-up")}>Toggle modal</Button>
      <Modal
        show={openModal === "pop-up"}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(undefined)}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
