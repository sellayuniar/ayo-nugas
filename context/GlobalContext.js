import { createContext, useState } from "react";
import { db } from "@/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import moment from "moment";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [user, setUser] = useState([]);
  const [semuaTugas, setSemuaTugas] = useState([]);
  const [isSidebar, setIsSidebar] = useState(false);
  const [loading, setLoading] = useState(false);

  const uid_user = Cookies.get("uid_user");
  const tugasCollectionRef = collection(db, "tugas");
  const queryGetTugasByUID = query(
    tugasCollectionRef,
    where("uid", "==", uid_user || "")
  );

  const getDataTugas = async () => {
    setLoading(true);

    const data = await getDocs(queryGetTugasByUID);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setSemuaTugas(filteredData);

    setLoading(false);
  };

  const penggunaDocRef = collection(db, "pengguna");
  const getDataUser = query(penggunaDocRef, where("uid", "==", uid_user || ""));

  //dapatin first name
  const getUser = async () => {
    setLoading(true);
    const data = await getDocs(getDataUser);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUser(filteredData);
    setLoading(false);
  };

  const handleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const state = {
    semuaTugas,
    setSemuaTugas,
    user,
    setUser,
    isSidebar,
    loading,
    setIsSidebar,
  };

  const handleFunctions = {
    getDataTugas,
    getUser,
    handleSidebar,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunctions }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
