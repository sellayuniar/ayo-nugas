import React from "react";

const MiniTotalPomodoro = ({ title, data }) => {
  const { getTotalPomodoro, totalWaktuFokus, getTotalPomodoroHariIni } = data;

  return (
    <div className="row mb-2 mr-2 flex w-full flex-col items-center rounded-lg bg-white p-5 shadow-lg md:w-2/4 xl:w-64">
      <h3 className="text-md mb-3 font-semibold"> {title} </h3>
      {title === "Total Pomodoro" ? (
        <>
          <p className="mb-2 text-3xl font-semibold text-[#EE3D3D]">
            {getTotalPomodoro()}
          </p>
          <p className="text-xs font-semibold text-[#EE3D3D]">
            *Total Waktu Fokus {totalWaktuFokus(getTotalPomodoro())}
          </p>
        </>
      ) : (
        <>
          <p className="mb-2 text-3xl font-semibold text-[#EE3D3D]">
            {" "}
            {getTotalPomodoroHariIni()}
          </p>
          <p className="text-xs font-semibold text-[#EE3D3D]">
            *Total Waktu Fokus {totalWaktuFokus(getTotalPomodoroHariIni())}
          </p>
        </>
      )}
    </div>
  );
};

export default MiniTotalPomodoro;
