import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
import BtnDaftarOutline from "@/components/Buttons/BtnDaftarOutline";
import SideBarLogin from "@/components/Sidebar/SideBarLogin";
import Link from "next/link";

const Masuk = () => {
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const logInWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="container flex h-[750px]">
      <SideBarLogin heightValue={800} />
      <div className="ml-20 mt-10 basis-1/2">
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
            <div className="align-center mt-10 flex justify-between">
              <Link href="#" className="text-[#F05050]">
                Lupa Kata Sandi?
              </Link>
              <button
                type="submit"
                className="w-full rounded-full bg-[#F05050] px-10 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Masuk;
