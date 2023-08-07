import ImgGagal from "@/assets/ImgSvg/ImgGagal";
import { Button, Modal } from "flowbite-react";
import emailjs from "emailjs-com";
import { useState } from "react";
import ModalTerkirim from "./ModalTerkirim";
import Cookies from "js-cookie";

export default function ModalKonfirmasiKirimEmail({ modalPropsEmail }) {
  const {
    openModalEmail,
    setOpenModalEmail,
    getTugasSelesai,
    formatDate,
    formatDateWithFullDay,
    user,
    startDate,
    endDate,
  } = modalPropsEmail;

  const [openModalTerkirim, setOpenModalTerkirim] = useState(false);
  const [pesan, setPesan] = useState(false);

  //send email
  const sendEmail = () => {
    const tableRows = getTugasSelesai().map(
      (data, idx) =>
        `<tr key=${
          data.id
        } style="border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: #D9D9D9">
        <td style="width: 200px; text-align: center;">${idx + 1}</td>
        <td style="width: 300px; text-align: center;">${data.judul_tugas}</td>
        <td style="width: 300px; text-align: center;">${data.catatan}</td>
        <td style="width: 300px; text-align: center;">${formatDate(
          data.waktu_pengerjaan
        )}</td>
        <td style="width: 300px; text-align: center;">${data.tipe_tugas}</td>
        <td style="width: 300px; text-align: center;">${
          data.kategori_tugas
        }</td>
        <td style="width: 300px; text-align: center;">${data.status}</td>
        <td style="width: 300px; text-align: center;">${data.estimasi}</td>
        <td style="width: 200px; text-align: center;">${data.real}</td>
      </tr>`
    );

    const serviceID = "service_m3s7bi4";
    const templateID = "template_i0850ea";
    const templateParams = {
      to_name: user[0]?.nama_depan,
      to_email: user[0]?.email,
      from_name: "Ayo Nugas",
      nama_depan: user[0]?.nama_depan,
      tanggal_mulai: formatDateWithFullDay(startDate),
      tanggal_selesai: formatDateWithFullDay(endDate),
      nama_lengkap: `${user[0]?.nama_depan} ${user[0]?.nama_belakang}`,
      message_html: `<table>
      <thead>
        <tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #D9D9D9">
          <th style="width: 200px; text-align: center;">No</th>
          <th style="width: 300px; text-align: center;">Judul</th>
          <th style="width: 300px; text-align: center;">Catatan</th>  
          <th style="width: 300px; text-align: center;">Tanggal</th>
          <th style="width: 300px; text-align: center;">Tipe Tugas</th>
          <th style="width: 300px; text-align: center;">Kategori</th>
          <th style="width: 300px; text-align: center;">Status</th>
          <th style="width: 300px; text-align: center;">Estimasi</th>
          <th style="width: 200px; text-align: center;">Real</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows.join("")}
      </tbody>
    </table>`,
    };
    const publicKey = "8LCe5KFWPoZJWyZYB";

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
      },
      (error) => {
        console.log("Email sending failed!", error);
      }
    );
  };

  const handleKirimEmail = () => {
    sendEmail();
    setPesan("Email laporan berhasil dikirim!");
    setOpenModalEmail(false);
    setOpenModalTerkirim(true);
  };

  const modalTerkirimProps = {
    openModalTerkirim,
    setOpenModalTerkirim,
    pesan,
  };

  const email = Cookies.get("email");

  return (
    <>
      <Modal
        show={openModalEmail === true}
        size="md"
        popup
        onClose={() => setOpenModalEmail(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center justify-center">
            <div>
              <h3 className="my-5 text-lg font-normal text-[#404040] dark:text-gray-400">
                Apakah anda yakin ingin mengirim laporan ke email?
              </h3>
              <p className="text-sm text-[#888888]">
                Detail tugas yang telah dikerjakan dikirimkan ke email {email}
              </p>
            </div>
            <div className="mb-5 mt-10 flex justify-between gap-4">
              <button
                className="mr-10  flex h-10 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-[#F05050] font-semibold text-[#F05050] hover:border-[#d63737] hover:text-[#d63737]"
                onClick={() => setOpenModalEmail(undefined)}
              >
                Batal
              </button>
              <button
                className="h-10 w-36  rounded-full bg-[#F05050] font-semibold text-white shadow-md hover:bg-[#d63737]"
                onClick={handleKirimEmail}
              >
                Ya, kirim
              </button>
            </div>
          </div>
        </Modal.Body>
        <ModalTerkirim modalTerkirimProps={modalTerkirimProps} />
      </Modal>
    </>
  );
}
