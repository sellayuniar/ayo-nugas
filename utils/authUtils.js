export const isFormatNPMCorrect = (propsIsFormatNPMCorrect) => {
  const { npmUser, setErrMsg, setOpenModal } = propsIsFormatNPMCorrect;
  let isValid = true;
  const NPMSifo = npmUser.toString().slice(2, 7);
  if (NPMSifo !== "08201") {
    setOpenModal(true);
    setErrMsg("npm tidak sesuai");
    isValid = false;
  }
  // console.log(NPMSifo);
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
    setErrMsg("Npm terdaftar");
    isValid = false;
  }
  // console.log(searchNPM);
  return isValid;
};
