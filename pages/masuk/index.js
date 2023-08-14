import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
import BtnDaftarOutline from "@/components/Buttons/BtnDaftarOutline";
import SideBarLogin from "@/components/SideView/SideBarLogin";
import Cookies from "js-cookie";
import Link from "next/link";
import ModalGagal from "@/components/ModalMessage/ModalGagal";
import Spinner from "@/components/Spinner";

const Masuk = () => {
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const logInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        dataUser.email,
        dataUser.password
      );
      if (login) {
        router.push("dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setOpenModal(true);
        setErrMsg("Akun pengguna belum terdaftar!");
      } else if (error.code === "auth/wrong-password") {
        setOpenModal(true);
        setErrMsg("Kata sandi salah!");
      } else if (error.code === "auth/network-request-failed") {
        setOpenModal(true);
        setErrMsg("Tidak ada koneksi internet!");
      }
      setLoading(false);
    }
  };

  const modalProps = { openModal, setOpenModal, errMsg };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        Cookies.set("uid_user", user.uid);
        Cookies.set("email", user.email);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <div className="flex h-[730px] justify-center">
      <SideBarLogin />
      <div className="mt-10 flex basis-6/12 flex-col lg:mx-24">
        <div>
          <div className="flex justify-end">
            <p className="text-md text-[#404040]">
              Belum memiliki akun?
              <span className="ml-2">
                <BtnDaftarOutline slug="daftar" namaBtn="Daftar" />
              </span>
            </p>
          </div>
          <div className="my-10">
            <h1 className="text-3xl font-semibold tracking-widest text-[#404040]">
              Selamat Datang di Ayo Nugas!
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-widest text-[#888888]">
              Silahkan Masuk
            </h2>
          </div>
          <form onSubmit={logInWithEmailAndPassword}>
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
                autoComplete="off"
              />
            </div>
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
                autoComplete="off"
              />
            </div>
            <div className="align-center mt-10 flex flex-col-reverse justify-between gap-5 md:flex-row">
              <Link href="/lupa-kata-sandi" className="text-[#F05050]">
                Lupa Kata Sandi?
              </Link>
              <button
                type="submit"
                className="w-full rounded-full bg-[#F05050] px-10 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
              >
                {loading ? <Spinner /> : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ModalGagal modalProps={modalProps} />
    </div>
  );
};

export default Masuk;
