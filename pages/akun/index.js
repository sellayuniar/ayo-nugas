import React, { useEffect, useContext, useState } from "react";
import Layout from "@/widget/Layout";
import Profile from "@/assets/icons/Profile";
import { GlobalContext } from "@/context/GlobalContext";
import { auth, db, storage } from "@/config/firebase";
import { updateEmail, deleteUser } from "firebase/auth";
import { updateDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

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

  const currentUser = auth.currentUser;

  const router = useRouter();

  useEffect(() => {
    getUser();
    if (fetchStatus) {
      getUser();
      setFetchStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(dataUser);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    const akunDocRef = doc(db, "pengguna", dataUser.idDoc || "");

    try {
      const updateAuthEmail = updateEmail(currentUser, dataUser.email);

      if (updateAuthEmail) {
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      }
    } catch (err) {
      console.log(err);
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

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <div>
          <h1 className="text-3xl font-bold text-[#404040]">Akun Pengguna</h1>
        </div>
        <div className="mt-10 flex w-full justify-center rounded-lg bg-white p-12 shadow-md ">
          <div>
            <div className="flex">
              <div className="h-15 w-15 ">
                {dataUser.photo ? (
                  <Image
                    src={dataUser.photo}
                    alt="Selected"
                    width={200}
                    height={200}
                  />
                ) : imageUpload ? (
                  <Image
                    src={imageUpload}
                    alt="Selected"
                    width={200}
                    height={200}
                  />
                ) : (
                  <Profile width={12} height={12} />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mx-2">
                <p>{`${dataUser.namaDepan} ${dataUser.namaBelakang}`}</p>
                <p>{dataUser.NPM}</p>
              </div>
            </div>

            <form className="mt-10">
              <div className="mb-5 flex flex-row">
                <div className="flex flex-col md:w-[200px] lg:w-[400px] ">
                  <label className="font-semibold">Nama Depan</label>
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
                </div>
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Nama Belakang</label>
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
                </div>
              </div>
              <div className="mb-5 flex flex-row ">
                <div className="flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">NPM</label>
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
                </div>
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Email</label>
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
                </div>
              </div>
              <div className="mb-5 flex flex-row">
                <div className="flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Jurusan</label>
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
                </div>
                <div className="ml-10 flex flex-col md:w-[200px] lg:w-[400px]">
                  <label className="font-semibold">Universitas</label>
                  <input
                    name="universitas"
                    type="text"
                    className="mt-2 h-[50px] w-full rounded-full border-gray-200 focus:border-red-300 focus:outline-none focus:ring-[#F05050] "
                    placeholder="contoh: 1"
                    value={dataUser.universitas}
                    onChange={(e) => {
                      setDataUser({ ...dataUser, universitas: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="mb-5 flex flex-col md:w-[200px] lg:w-[400px]">
                <label className="font-semibold">Bio</label>
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
              </div>
              <div className="flex justify-between">
                <span
                  className="text-md cursor-pointer rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737]"
                  onClick={handleDelete}
                >
                  Hapus Akun
                </span>
                <span
                  className="text-md cursor-pointer rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg hover:bg-[#d63737]"
                  onClick={handleUpdate}
                >
                  Perbarui Akun
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Akun;
