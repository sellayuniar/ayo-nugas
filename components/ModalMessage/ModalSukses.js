import { Button, Modal } from "flowbite-react";
import ImgSukses from "@/assets/ImgSvg/imgSukses";
import { useRouter } from "next/router";

export default function ModalGagal({ modalSuksesProps }) {
  const { openModalSukses, setOpenModalSukses } = modalSuksesProps;
  const router = useRouter();

  const handleSukses = () => {
    setOpenModalSukses(undefined);
    router.push("/masuk");
  };

  return (
    <>
      <Modal
        show={openModalSukses === true}
        size="md"
        popup
        onClose={() => setOpenModalSukses(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <ImgSukses />
            <h1 className="my-5 text-lg font-normal text-gray-700 dark:text-gray-400">
              Pendaftaran Sukses
            </h1>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Selamat akun anda berhasil didaftarkan!
            </h3>
            <div className="gap-4">
              <Button color="failure" onClick={handleSukses}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
