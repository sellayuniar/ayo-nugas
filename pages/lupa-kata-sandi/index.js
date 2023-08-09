import React, { useState } from "react";
import SideBarLupaKataSandi from "@/components/SideView/SideBarLupaKataSandi";
import Spinner from "@/components/Spinner";
import ModalGagal from "@/components/ModalMessage/ModalGagal";
import { auth } from "@/config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import ModalTerkirim from "@/components/ModalMessage/ModalTerkirim";

const LupaKataSandi = () => {
  const [emailUser, setEmailUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalTerkirim, setOpenModalTerkirim] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pesan, setPesan] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const sendEmailReset = (e) => {
    setLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(auth, emailUser)
      .then(() => {
        setLoading(false);
        setPesan("Email atur ulang kata sandi berhasil di kirim!");
        setOpenModalTerkirim(true);
        console.log("Sending password reset");
      })
      .catch((error) => {
        setLoading(false);
        setErrMsg("Email anda belum terdaftar!");
        setOpenModal(true);
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  const modalTerkirimProps = {
    openModalTerkirim,
    setOpenModalTerkirim,
    pesan,
  };
  const modalProps = { openModal, setOpenModal, errMsg };
  return (
    <div className="flex h-[730px] justify-center">
      <SideBarLupaKataSandi />
      <div className="mt-10 flex basis-6/12 flex-col lg:mx-24">
        <div>
          <div className="my-10">
            <h1 className="text-3xl font-semibold tracking-widest text-[#404040]">
              Lupa Kata Sandi?
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-widest text-[#888888]">
              Masukan email yang terdaftar
            </h2>
          </div>
          <form onSubmit={sendEmailReset}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
                value={emailUser}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                placeholder="19820100xx@student.upnjatim.ac.id"
                required
                autoComplete="off"
              />
            </div>

            <div className="align-center mt-10 flex justify-between">
              <button
                type="submit"
                className="w-full rounded-full bg-[#F05050] px-10 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
              >
                {loading ? <Spinner /> : "Lanjutkan"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <ModalGagal modalProps={modalProps} /> */}
      <ModalTerkirim modalTerkirimProps={modalTerkirimProps} />
      <ModalGagal modalProps={modalProps} />
    </div>
  );
};

export default LupaKataSandi;
