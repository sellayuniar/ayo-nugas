import ImgSukses from "@/assets/ImgSvg/imgSukses";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";

export default function ModalSuksesHapusAkun({ modalSuksesProps }) {
  const { modalBerhasil, setModalBerhasil, pesan } = modalSuksesProps;

  const router = useRouter();

  const handleClose = () => {
    setModalBerhasil(false);
    router.push("/");
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
            <h3 className="my-5 text-lg font-normal text-[#404040]">{pesan}</h3>
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
