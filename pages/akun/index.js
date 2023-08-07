import React, { useEffect, useContext, useState } from "react";
import Layout from "@/widget/Layout";
import Profile from "@/assets/icons/Profile";
import { GlobalContext } from "@/context/GlobalContext";
import { auth, db, storage } from "@/config/firebase";
import { updateEmail, deleteUser } from "firebase/auth";
import {
  updateDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Trash from "@/assets/icons/Trash";
import { isNPMRegistered, isFormatNPMCorrect } from "@/utils/authUtils";
import ModalGagal from "@/components/ModalMessage/ModalGagal";
import ModalSukses from "@/components/ModalMessage/ModalSukses";

const Akun = () => {
  const { state, handleFunctions } = useContext(GlobalContext);
  const { user } = state;
  const { getUser } = handleFunctions;
  const [dataUser, setDataUser] = useState({
    idDoc: user[0]?.id,
    namaDepan: user[0]?.nama_depan,
    namaBelakang: user[0]?.nama_belakang,
    NPM: user[0]?.npm,
    email: user[0]?.email,
    jurusan: user[0]?.jurusan,
    universitas: user[0]?.universitas,
    bio: user[0]?.bio,
    photo: user[0]?.photo,
  });
  const [fetchStatus, setFetchStatus] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [ubahData, setUbahData] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSukses, setOpenModalSukses] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const currentUser = auth.currentUser;

  const router = useRouter();

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
  }, []);
  console.log(dataUser);

  const handleUpdate = async () => {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    const akunDocRef = doc(db, "pengguna", dataUser.idDoc || "");
    try {
      const updateAuthEmail = updateEmail(currentUser, dataUser.email);
      if (updateAuthEmail && imageUpload) {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateDoc(akunDocRef, {
                nama_depan: dataUser.namaDepan,
                nama_belakang: dataUser.namaBelakang,
                npm: dataUser.NPM,
                email: dataUser.email,
                jurusan: dataUser.jurusan,
                universitas: dataUser.universitas,
                bio: dataUser.bio,
                photo: downloadURL,
              });
            });
          }
        );

        setFetchStatus(true);
      } else if (updateAuthEmail) {
        updateDoc(akunDocRef, {
          nama_depan: dataUser.namaDepan,
          nama_belakang: dataUser.namaBelakang,
          npm: dataUser.NPM,
          email: dataUser.email,
          jurusan: dataUser.jurusan,
          universitas: dataUser.universitas,
          bio: dataUser.bio,
          photo: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const npmUser = dataUser.NPM;
  const propsIsFormatNPMCorrect = { npmUser, setErrMsg, setOpenModal };
  const propsIsNPMRegistered = { allUser, npmUser, setErrMsg, setOpenModal };
  const modalProps = { openModal, setOpenModal, errMsg };
  const modalSuksesProps = { openModalSukses, setOpenModalSukses };

  const handleCheck = (event) => {
    event.preventDefault();
    //check npm ada

    if (isFormatNPMCorrect(propsIsFormatNPMCorrect)) {
      if (isNPMRegistered(propsIsNPMRegistered)) {
        handleUpdate();
      }
    }
  };

  const handlePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setDataUser({ ...dataUser, photo: i });
      setImageUpload(URL.createObjectURL(i));
    }
  };

  const handleDelete = () => {
    deleteUser(currentUser)
      .then(() => {
        const akunDocRef = doc(db, "pengguna", dataUser.idDoc || "");
        deleteDoc(akunDocRef);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleBatal = () => {
  //   setDataUser(
  //     {
  //       namaDepan: user[0]?.nama_depan,
  //       namaBelakang: user[0]?.nama_belakang,
  //       NPM: user[0]?.npm,
  //       email: user[0]?.email,
  //       jurusan: user[0]?.jurusan,
  //       universitas: user[0]?.universitas,
  //       bio: user[0]?.bio,
  //       photo: user[0]?.photo,
  //     }
  //   )
  // }

  console.log(dataUser.photo, imageUpload);

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <div>
          <h1 className="text-3xl font-bold text-[#404040]">Akun Pengguna</h1>
        </div>
        <div className="mt-10 flex w-full justify-center rounded-lg bg-white p-12 shadow-md ">
          <div>
            <div className="flex">
              <span className="h-15 w-15 ">
                {/* {dataUser.photo !== "" ? (
                  <Image
                    src={dataUser.photo}
                    alt="Selected"
                    width={50}
                    height={50}
                    className="h-16 w-16 rounded-[100%] object-cover"
                  />
                ) : imageUpload ? (
                  <Image
                    src={imageUpload}
                    alt="Selected"
                    width={50}
                    height={50}
                    className="h-16 w-16 rounded-[100%] object-cover"
                  />
                ) : ( */}

                <Profile width={15} height={15} />
                {/* )} */}

                {/* {ubahData && (
                  <>
                    <label htmlFor="ubahFoto" className="cursor-pointer">
                      Ubah Foto
                    </label>

                    <input
                      id="ubahFoto"
                      name="ubahFoto"
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </>
                )} */}
              </span>
              <div className="mx-2">
                <p>{`${dataUser.namaDepan} ${dataUser.namaBelakang}`}</p>
                <p>{dataUser.NPM}</p>
              </div>
            </div>

            <form className="mt-10">
              <div className="mb-5 flex flex-row">
                <div className="flex flex-col md:w-[200px] lg:w-[400px] ">
                  <label className="font-semibold">Nama Depan</label>
                  {ubahData ? (
                    <input
                      name="namaDepan"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: 1"
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
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Nama Belakang</label>
                  {ubahData ? (
                    <input
                      name="namaBelakang"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: 1"
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
              <div className="mb-5 flex flex-row ">
                <div className="flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">NPM</label>
                  {ubahData ? (
                    <input
                      name="npm"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050]"
                      placeholder="contoh: 1"
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
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Email</label>
                  {ubahData ? (
                    <input
                      name="email"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: 1"
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
              <div className="mb-5 flex flex-row">
                <div className="flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Jurusan</label>
                  {ubahData ? (
                    <input
                      name="jurusan"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: 1"
                      value={dataUser.jurusan}
                      onChange={(e) => {
                        setDataUser({ ...dataUser, jurusan: e.target.value });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.jurusan}</p>
                    </div>
                  )}
                </div>
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Universitas</label>
                  {ubahData ? (
                    <input
                      name="universitas"
                      type="text"
                      className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                      placeholder="contoh: 1"
                      value={dataUser.universitas}
                      onChange={(e) => {
                        setDataUser({
                          ...dataUser,
                          universitas: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <div className="mt-2 flex h-[50px] items-center rounded-full border border-gray-200 px-3">
                      <p>{dataUser.universitas}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-5 flex flex-col md:w-[200px] lg:w-[400px]">
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
              <div>
                {ubahData ? (
                  <div className="flex justify-between">
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full border-2 border-[#f16464] bg-transparent px-6 py-3 text-center font-semibold text-[#f16464] hover:border-[#d63737]"
                      onClick={() => {
                        setUbahData(false);
                      }}
                    >
                      Batal
                    </span>
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full bg-[#F16464] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#d63737]"
                      onClick={handleCheck}
                    >
                      Simpan Perubahan
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full border-2 border-[#f16464] bg-transparent px-6 py-3 text-center font-semibold text-[#f16464] hover:border-[#d63737]"
                      onClick={handleDelete}
                    >
                      <span className="mr-2 h-7 w-7">
                        <Trash />
                      </span>
                      Hapus Akun
                    </span>
                    <span
                      className="text-md mx-2 flex w-64 cursor-pointer items-center justify-center rounded-full bg-[#F16464] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#d63737]"
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
      <ModalSukses modalSuksesProps={modalSuksesProps} />
    </Layout>
  );
};

export default Akun;
