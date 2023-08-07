import Cookies from "js-cookie";
export const isFormatNPMCorrect = (propsIsFormatNPMCorrect) => {
  const { npmUser, setErrMsg, setOpenModal } = propsIsFormatNPMCorrect;
  let isValid = true;
  const NPMSifo = npmUser.toString().slice(2, 5);
  if (NPMSifo !== "082") {
    setOpenModal(true);
    setErrMsg("Format npm tidak sesuai!");
    isValid = false;
  }
  console.log(NPMSifo);
  return isValid;
};

export const isNPMRegistered = (propsIsNPMRegistered) => {
  const { allUser, npmUser, setErrMsg, setOpenModal } = propsIsNPMRegistered;
  let isValid = true;
  const uid = Cookies.get("uid_user");
  console.log(uid, allUser[0].uid);
  const searchNPM = allUser.filter((data) =>
    data.npm?.toString().toLowerCase().includes(npmUser)
  );
  if (searchNPM.length >= 1) {
    if (uid && allUser[0].uid === uid) {
      isValid = true;
    } else if (!uid) {
      isValid = true;
    } else {
      setOpenModal(true);
      setErrMsg("Npm telah terpakai!");
      isValid = false;
    }
  }
  // console.log(searchNPM);
  return isValid;
};
