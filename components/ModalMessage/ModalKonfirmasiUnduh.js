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
          <div className="flex flex-col items-center justify-center">
            <ImgGagal />
            <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah anda yakin ingin mengirim mengunduh laporan?
            </h3>
            <div className="gap-4">
              <Button color="failure" onClick={() => setOpenModalUnduh(false)}>
                Batal
              </Button>
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
                  className="text-md mr-5 flex  w-56 items-center justify-center rounded-lg bg-[#F16464] py-2.5 font-semibold text-white shadow-lg hover:bg-[#d63737]"
                  fileName={`Laporan Tugas ${startDate} - ${endDate}`}
                  onClick={() => setOpenModalUnduh(false)}
                >
                  Yakin
                </PDFDownloadLink>
              ) : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
