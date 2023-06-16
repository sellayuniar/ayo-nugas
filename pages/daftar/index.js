import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import BtnDaftarOutline from "@/components/Buttons/BtnDaftarOutline";
import SideBarLogin from "@/components/SideBar/SideBarLogin";

const Daftar = () => {
  const [dataUser, setDataUser] = useState({
    npm: "",
    email: "",
    nama_depan: "",
    nama_belakang: "",
    password: "",
  });

  const penggunaCollectionRef = collection(db, "pengguna");

  const [confirmPass, setConfirmPass] = useState("");

  const router = useRouter();

  // check format npm correct
  const isFormatNPMCorrect = () => {};
  // check Npm registed
  const isNPMRegistered = () => {};
  // check confirm password valid
  const validatePassword = () => {};

  const handleDaftar = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then(
        addDoc(penggunaCollectionRef, {
          npm: dataUser.npm,
          nama_depan: dataUser.nama_depan,
          nama_belakang: dataUser.nama_belakang,
          email: dataUser.email,
          universitas: "Universitas Pembangunan Nasional Veteran Jawa Timur",
          jurusan: "Sistem Informasi",
          bio: "",
        })
      )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/masuk");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="container flex">
      <SideBarLogin heightValue={1100} />
      <div className="ml-20 mt-10 basis-1/2">
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
                required=""
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
                  setConfirmPass(e.target.value);
                }}
                value={confirmPass}
                className="block  w-full rounded-full border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-[#F16464] focus:ring-[#F16464]"
                required
              />
            </div>
            <div className="align-center mt-10 flex justify-center">
              <button
                type="submit"
                className="w-full rounded-full bg-[#F05050] px-10 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
