import { createContext, useState } from "react";
import { db } from "@/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import moment from "moment";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [semuaTugas, setSemuaTugas] = useState([]);

  const uid_user = Cookies.get("uid_user");
  const tugasCollectionRef = collection(db, "tugas");
  const queryGetTugasByUID = query(
    tugasCollectionRef,
    where("uid", "==", uid_user || "")
  );

  const getDataTugas = async () => {
    const data = await getDocs(queryGetTugasByUID);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setSemuaTugas(filteredData);
  };

  const state = {
    semuaTugas,
    setSemuaTugas,
  };

  const handleFunctions = {
    getDataTugas,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunctions }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
