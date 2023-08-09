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

  return isValid;
};

export const isNPMRegistered = (propsIsNPMRegistered) => {
  const { allUser, npmUser, setErrMsg, setOpenModal } = propsIsNPMRegistered;
  let isValid = true;
  const searchNPM = allUser.filter((data) =>
    data.npm?.toString().toLowerCase().includes(npmUser)
  );
  if (searchNPM.length >= 1) {
    setOpenModal(true);
    setErrMsg("Npm telah terpakai!");
    isValid = false;
  }
  // console.log(searchNPM);
  return isValid;
};
