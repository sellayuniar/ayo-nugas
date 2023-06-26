import { Button, Modal } from "flowbite-react";
import Select from "react-select";

export default function DefaultModal({ openModal, setOpenModal }) {
  return (
    <>
      <Modal
        show={openModal === true}
        onClose={() => setOpenModal("")}
        size="3xl"
        position="top-center"
      >
        {/* <Modal.Header /> */}
        <Modal.Body>
          <div>
            <div className="">
              <h1>Tambah Tugas</h1>
            </div>
            <div>
              <form className="flex flex-col">
                <div className="flex flex-col">
                  <label>Judul Tugas</label>
                  <input type="text" />
                </div>

                <div className="flex flex-col">
                  <label>Catatan</label>
                  <textarea />
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label>Waktu Pengerjaan</label>
                    <input type="date-time" />
                  </div>
                  <div className="flex flex-col">
                    <label>Tipe Tugas</label>
                    <Select />
                  </div>
                  <div className="flex flex-col">
                    <label>Kategori Tugas</label>
                    <Select />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label>Status</label>
                    <Select />
                  </div>
                  <div className="flex flex-col">
                    <label>Estimasi</label>
                    <Select />
                  </div>
                  <div className="flex flex-col">
                    <label>Real</label>
                    <Select />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button>batal</button>
                  <button>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
