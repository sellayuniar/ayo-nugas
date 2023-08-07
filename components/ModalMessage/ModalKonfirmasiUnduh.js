import ImgGagal from "@/assets/ImgSvg/ImgGagal";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DataPDF from "@/components/ViewLaporanData/DataPDF";

export default function ModalKonfirmasiUnduh({ modalPropsUnduh }) {
  const {
    openModalUnduh,
    setOpenModalUnduh,
    getTugasSelesai,
    formatDate,
    formatDateWithFullDay,
    user,
    startDate,
    endDate,
  } = modalPropsUnduh;
  const [isClient, setIsClient] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setIsClient(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        show={openModalUnduh === true}
        size="md"
        popup
        onClose={() => setOpenModalUnduh(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div>
              <h3 className="mb-5 text-lg font-normal text-[#404040] dark:text-gray-400">
                Apakah anda yakin ingin mengirim mengunduh laporan?
              </h3>
              <p className="text-sm text-[#888888]">
                Detail tugas yang telah dikerjakan akan dibuatkan dalam format
                PDF
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                color="failure"
                className="mr-10  flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050] hover:border-[#d63737] hover:text-[#d63737]"
                onClick={() => setOpenModalUnduh(false)}
              >
                Batal
              </button>
              {isClient ? (
                <PDFDownloadLink
                  document={
                    <DataPDF
                      dataTugasSelesai={getTugasSelesai()}
                      user={user}
                      startDate={startDate}
                      endDate={endDate}
                      formatDate={formatDate}
                      formatDateWithFullDay={formatDateWithFullDay}
                    />
                  }
                  className="flex h-10 w-36  items-center justify-center rounded-full bg-[#F05050] font-semibold text-white shadow-md hover:bg-[#d63737]"
                  fileName={`Laporan Tugas ${startDate} - ${endDate}`}
                  onClick={() => setOpenModalUnduh(false)}
                >
                  Ya, unduh
                </PDFDownloadLink>
              ) : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
