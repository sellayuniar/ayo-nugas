import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { isFormatNPMCorrect, isNPMRegistered } from "@/utils/authUtils";
import { addDoc, collection, getDocs } from "firebase/firestore";
import BtnDaftarOutline from "@/components/Buttons/BtnDaftarOutline";
import SideBarLogin from "@/components/SideView/SideBarLogin";
import ModalGagal from "@/components/ModalMessage/ModalGagal";
import ModalSukses from "@/components/ModalMessage/ModalSukses";
import Spinner from "@/components/Spinner";

const Daftar = () => {
  const [allUser, setAllUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    npm: "",
    email: "",
    nama_depan: "",
    nama_belakang: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalSukses, setOpenModalSukses] = useState(false);
  const [loading, setLoading] = useState(false);

  const penggunaCollectionRef = collection(db, "pengguna");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(penggunaCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllUser(filteredData);
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validatePassword = () => {
    let isValid = true;
    if (dataUser.password !== "" && confirmPassword !== "") {
      if (dataUser.password !== confirmPassword) {
        isValid = false;
        setOpenModal(true);
        setErrMsg("Konfirmasi kata sandi tidak sesuai!");
      }
    }
    return isValid;
  };

  const npmUser = dataUser.npm;
  const modalProps = { openModal, setOpenModal, errMsg };
  const modalSuksesProps = { openModalSukses, setOpenModalSukses };
  const propsIsFormatNPMCorrect = { npmUser, setErrMsg, setOpenModal };
  const propsIsNPMRegistered = { allUser, npmUser, setErrMsg, setOpenModal };

  const handleDaftar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isFormatNPMCorrect(propsIsFormatNPMCorrect)) {
        if (isNPMRegistered(propsIsNPMRegistered)) {
          if (validatePassword()) {
            const daftar = await createUserWithEmailAndPassword(
              auth,
              dataUser.email,
              dataUser.password
            );
            if (daftar) {
              addDoc(penggunaCollectionRef, {
                uid: daftar.user.uid,
                npm: dataUser.npm,
                nama_depan: dataUser.nama_depan,
                nama_belakang: dataUser.nama_belakang,
                email: dataUser.email,
                universitas: "UPN Veteran Jawa Timur",
                jurusan: "Sistem Informasi",
                bio: "",
              });
              setOpenModalSukses(true);
            }
          }
        }
      }
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setOpenModal(true);
        setErrMsg("email telah digunakan");
      } else if (error.code === "auth/network-request-failed") {
        setOpenModal(true);
        setErrMsg("Tidak ada koneksi internet!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <SideBarLogin />
      <div className="container mx-10 mt-10 flex basis-6/12 flex-col lg:mx-24">
        <div>
          <div className="flex justify-end">
            <p className="text-md text-[#404040]">
              Sudah memiliki akun?
              <span className="ml-2">
                <BtnDaftarOutline slug="masuk" namaBtn="Masuk" />
              </span>
            </p>
          </div>
          <div className="my-10">
            <h1 className="text-3xl font-semibold tracking-widest text-[#404040]">
              Selamat Datang di Ayo Nugas!
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-widest text-[#888888]">
              Silahkan Mendaftar
            </h2>
          </div>
          <form onSubmit={handleDaftar} className="mb-20">
            {/* npm */}
            <div className="mb-6">
              <label
                htmlFor="npm"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                NPM
              </label>
              <input
                type="number"
                id="npm"
                onChange={(e) => {
                  setDataUser({ ...dataUser, npm: e.target.value });
                }}
                value={dataUser.npm}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                placeholder="19820100xx"
                required
              />
            </div>
            {/* nama depan & belakang */}
            <div className="mb-6">
              <label
                htmlFor="nama_depan"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Depan
              </label>
              <input
                type="text"
                id="nama_depan"
                onChange={(e) => {
                  setDataUser({ ...dataUser, nama_depan: e.target.value });
                }}
                value={dataUser.nama_depan}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                placeholder="contoh: Sella"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="nama_belakang"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Belakang
              </label>
              <input
                type="text"
                id="nama_belakang"
                onChange={(e) => {
                  setDataUser({ ...dataUser, nama_belakang: e.target.value });
                }}
                value={dataUser.nama_belakang}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                placeholder="contoh: Yuniar"
                required
              />
            </div>
            {/* email */}
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
                  setDataUser({ ...dataUser, email: e.target.value });
                }}
                value={dataUser.email}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                placeholder="19820100xx@student.upnjatim.ac.id"
                required
              />
            </div>
            {/* kata sandi */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setDataUser({ ...dataUser, password: e.target.value });
                }}
                value={dataUser.password}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                required
              />
            </div>
            {/* konfirmasi kata sandi */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                required
              />
            </div>

            <button
              type="submit"
              className=" w-full rounded-full bg-[#F05050] px-32 py-2.5 text-center text-lg font-medium text-white md:px-80"
            >
              {loading ? <Spinner /> : "Daftar"}
            </button>
          </form>
        </div>
      </div>
      <ModalGagal modalProps={modalProps} />
      <ModalSukses modalSuksesProps={modalSuksesProps} />
    </div>
  );
};

export default Daftar;
