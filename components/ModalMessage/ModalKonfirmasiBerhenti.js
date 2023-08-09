import { Modal } from "flowbite-react";

import { useState } from "react";
import Spinner from "../Spinner";

export default function ModalKonfirmasiBerhenti({ modalBerhentiProps }) {
  const { stopTimer, openModalBerhenti, setOpenModalBerhenti } =
    modalBerhentiProps;
  const [loading, setLoading] = useState(false);

  const handleBerhenti = async () => {
    setLoading(true);
    stopTimer();
    setLoading(false);
    setOpenModalBerhenti(false);
  };

  return (
    <>
      <Modal
        show={openModalBerhenti === true}
        size="md"
        popup
        onClose={() => setOpenModalBerhenti(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-5">
              <h3 className="my-5 text-lg font-normal text-[#404040]">
                Apakah kamu yakin untuk menghentikan pomodoro?
              </h3>
              <p className="text-sm text-[#888888] ">
                Sesi pomodoro pada tugas ini akan dihentikan dan disimpan!
              </p>
            </div>

            <div className="mt-4 flex">
              <span
                className=" mr-10  flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050] hover:border-[#d63737] hover:text-[#d63737]"
                onClick={() => setOpenModalBerhenti(undefined)}
              >
                Batal
              </span>
              <button
                className="h-10 w-40  rounded-full bg-[#F05050] font-semibold text-white shadow-md hover:bg-[#d63737]"
                onClick={handleBerhenti}
              >
                {loading ? <Spinner /> : "Yakin, Berhenti"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
