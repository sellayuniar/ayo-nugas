import React, { useEffect, useContext, useState } from "react";
import Layout from "@/widget/Layout";
import Profile from "@/assets/icons/Profile";
import { GlobalContext } from "@/context/GlobalContext";
import { auth, db } from "@/config/firebase";
import { updateEmail, deleteUser } from "firebase/auth";
import {
  updateDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Trash from "@/assets/icons/Trash";
import { isFormatNPMCorrect } from "@/utils/authUtils";
import ModalGagal from "@/components/ModalMessage/ModalGagal";
import ModalSuksesAkun from "@/components/ModalMessage/ModalSuksesAkun";
import ModalKonfirmasiHapusAkun from "@/components/ModalMessage/ModalKonfirmasiHapusAkun";
import Spinner from "@/components/Spinner";

const Akun = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { user } = state;
  const { getUser } = handleFunctions;
  const [dataUser, setDataUser] = useState({
    uid: user[0]?.uid,
    idDoc: user[0]?.id,
    namaDepan: user[0]?.nama_depan,
    namaBelakang: user[0]?.nama_belakang,
    NPM: user[0]?.npm,
    email: user[0]?.email,
    jurusan: user[0]?.jurusan,
    universitas: user[0]?.universitas,
    bio: user[0]?.bio,
  });
  const [fetchStatus, setFetchStatus] = useState(false);
  const [ubahData, setUbahData] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalBerhasil, setModalBerhasil] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [pesan, setPesan] = useState("");
  const [openModalHapus, setOpenModalHapus] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  const penggunaCollectionRef = collection(db, "pengguna");

  useEffect(() => {
    getUser();
    if (fetchStatus) {
      getUser();
      setFetchStatus(false);
    }

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
  }, [fetchStatus]);

  const isNPMRegistered = () => {
    let isValid = true;
    const searchNPM = allUser.filter((data) =>
      data.npm?.toString().toLowerCase().includes(npmUser)
    );

    if (searchNPM.length >= 1 && dataUser.NPM === allUser[0].npm) {
      setOpenModal(true);
      setErrMsg("Npm telah terpakai!");
      isValid = false;
    }
    // console.log(searchNPM);
    return isValid;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const akunDocRef = doc(db, "pengguna", dataUser.idDoc || "");
    setLoading(true);
    if (isFormatNPMCorrect(propsIsFormatNPMCorrect)) {
      if (isNPMRegistered()) {
        updateEmail(currentUser, dataUser.email)
          .then(() => {
            updateDoc(akunDocRef, {
              nama_depan: dataUser.namaDepan,
              nama_belakang: dataUser.namaBelakang,
              npm: dataUser.NPM,
              email: dataUser.email,
              jurusan: dataUser.jurusan,
              universitas: dataUser.universitas,
              bio: dataUser.bio,
            });
            setPesan("Data akun berhasil diperbarui!");
            setModalBerhasil(true);
            setUbahData(false);
            setLoading(false);
            setFetchStatus(true);
          })
          .catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              setOpenModal(true);
              setErrMsg("Email telah digunakan!");
              setLoading(false);
            }
          });
      }
    }
    setLoading(false);
  };

  const npmUser = dataUser.NPM;
  const propsIsFormatNPMCorrect = { npmUser, setErrMsg, setOpenModal };
  const modalProps = { openModal, setOpenModal, errMsg };

  const modalHapusAkunProps = {
    loading,
    setLoading,
    openModalHapus,
    setOpenModalHapus,
    deleteDoc,
    deleteUser,
    dataUser,
    currentUser,
  };

  const modalSuksesProps = {
    modalBerhasil,
    setModalBerhasil,
    setFetchStatus,
    pesan,
  };

  const handleBatal = () => {
    setUbahData(false);
    setDataUser({
      uid: user[0]?.uid,
      idDoc: user[0]?.id,
      namaDepan: user[0]?.nama_depan,
      namaBelakang: user[0]?.nama_belakang,
      NPM: user[0]?.npm,
      email: user[0]?.email,
      jurusan: user[0]?.jurusan,
      universitas: user[0]?.universitas,
      bio: user[0]?.bio,
    });
  };

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <div>
          <h1 className="text-3xl font-bold text-[#404040]">Akun Pengguna</h1>
        </div>
        <div className="mt-10 flex w-full items-center justify-center rounded-lg bg-white p-12 shadow-md ">
          <div className="container">
            <div className="flex">
              <span className="h-20 w-20 ">
                <Profile width={12} height={12} />
              </span>
              <div className="mx-2">
                <p>{`${dataUser.namaDepan} ${dataUser.namaBelakang}`}</p>
                <p>{dataUser.NPM}</p>
              </div>
            </div>

            <form>
              <div className="mb-5 flex flex-col lg:flex-row ">
                <div className="flex w-full flex-col lg:w-[450px] ">
                  <label className="font-semibold">Nama Depan</label>
                  {ubahData ? (
                    <input
                      name="namaDepan"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: Sella"
                      value={dataUser?.namaDepan}
                      onChange={(e) => {
                        setDataUser({ ...dataUser, namaDepan: e.target.value });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.namaDepan}</p>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex w-full flex-col lg:ml-10 lg:mt-0 lg:w-[450px]">
                  <label className="font-semibold">Nama Belakang</label>
                  {ubahData ? (
                    <input
                      name="namaBelakang"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: Yuniar"
                      value={dataUser.namaBelakang}
                      onChange={(e) => {
                        setDataUser({
                          ...dataUser,
                          namaBelakang: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.namaBelakang}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-5 flex flex-col lg:flex-row">
                <div className="flex w-full flex-col lg:w-[450px]">
                  <label className="font-semibold">NPM</label>
                  {ubahData ? (
                    <input
                      name="npm"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: 190820100XX"
                      value={dataUser.NPM}
                      onChange={(e) => {
                        setDataUser({ ...dataUser, NPM: e.target.value });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.NPM}</p>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex w-full flex-col lg:ml-10 lg:mt-0 lg:w-[450px]">
                  <label className="font-semibold">Email</label>
                  {ubahData ? (
                    <input
                      name="email"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: 190820100XX@student.upnjatim.ac.id"
                      value={dataUser.email}
                      onChange={(e) => {
                        setDataUser({ ...dataUser, email: e.target.value });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.email}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-5 flex flex-col lg:flex-row">
                <div className="flex w-full flex-col lg:w-[450px]">
                  <label className="font-semibold">Jurusan</label>
                  {ubahData ? (
                    <input
                      name="jurusan"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 bg-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: sistem informasi"
                      value={dataUser.jurusan}
                      onChange={(e) => {
                        setDataUser({ ...dataUser, jurusan: e.target.value });
                      }}
                      disabled
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.jurusan}</p>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex w-full flex-col lg:ml-10 lg:mt-0 lg:w-[450px]">
                  <label className="font-semibold">Universitas</label>
                  {ubahData ? (
                    <input
                      name="universitas"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 bg-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: universitas"
                      value={dataUser.universitas}
                      onChange={(e) => {
                        setDataUser({
                          ...dataUser,
                          universitas: e.target.value,
                        });
                      }}
                      disabled
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.universitas}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-5 flex w-full flex-col lg:w-[450px]">
                <label className="font-semibold">Bio</label>
                {ubahData ? (
                  <input
                    name="bio"
                    type="text"
                    className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                    placeholder={
                      dataUser.bio === "" && "Silahkan lengkapi data..."
                    }
                    value={dataUser.bio}
                    onChange={(e) => {
                      setDataUser({ ...dataUser, bio: e.target.value });
                    }}
                  />
                ) : (
                  <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                    <p>{dataUser.bio}</p>
                  </div>
                )}
              </div>
              <div className="mt-10">
                {ubahData ? (
                  <div className="flex justify-between">
                    <span
                      className="text-md mx-2 flex w-full cursor-pointer items-center justify-center rounded-full border-2 border-[#f16464] bg-transparent px-6 py-3 text-center font-semibold text-[#f16464] hover:border-[#d63737]"
                      onClick={handleBatal}
                    >
                      Batal
                    </span>
                    <span
                      className="text-md mx-2 flex w-full cursor-pointer items-center justify-center rounded-full bg-[#F16464] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#d63737] lg:mr-10"
                      onClick={handleUpdate}
                    >
                      {loading ? <Spinner /> : " Simpan Perubahan"}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full border-2 border-[#f16464] bg-transparent px-6 py-3 text-center font-semibold text-[#f16464] hover:border-[#d63737]"
                      onClick={() => setOpenModalHapus(true)}
                    >
                      <span className="mr-2 hidden h-7 w-7 md:flex">
                        <Trash />
                      </span>
                      Hapus Akun
                    </span>
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full bg-[#F16464] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#d63737] lg:mr-10"
                      onClick={() => {
                        setUbahData(true);
                      }}
                    >
                      Perbarui Akun
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalGagal modalProps={modalProps} />
      <ModalKonfirmasiHapusAkun modalHapusAkunProps={modalHapusAkunProps} />
      <ModalSuksesAkun modalSuksesProps={modalSuksesProps} />
    </Layout>
  );
};

export default Akun;
