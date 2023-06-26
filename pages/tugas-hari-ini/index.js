import React, { useEffect, useState } from "react";
import Layout from "@/widget/Layout";
import { Howl } from "howler";
import ClockMp3 from "@/public/media/clock.mp3";
import BellMp3 from "@/public/media/bell.mp3";
import ModalTugas from "@/components/Modal/ModalTugas";

// assets
const clockLoop = new Howl({
  src: [ClockMp3],
  loop: true,
});

const BellSfx = new Howl({
  src: [BellMp3],
});

const TugasHariIni = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [workInterval, setWorkInterval] = useState(3);
  const [breakInterval, setBreakInterval] = useState(0);
  const [onPause, setOnPause] = useState(false);
  const [openModal, setOpenModal] = useState();

  //useEffect
  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        //Decrase seconds
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        }
        //decrease minutes
        if (timeSec === 0) {
          setTimeMin((timeMin) => timeMin - 1);
          setTimeSec(59);
        }
        //check if time ends
        if (timeMin === 0 && timeSec === 0) {
          setIsRunning(false);
          clockLoop.stop();
          setTimeMin(0);
          setTimeSec(0);
          BellSfx.play();
          // keep track interval
          if (!onBreak) {
            setWorkInterval((workInterval) => workInterval + 1);
            if (workInterval > 0 && workInterval % 3 === 0) {
              setTimeMin(15);
            } else {
              setTimeMin(5);
            }
            setOnBreak(true);
          }

          // tracking break
          if (onBreak) {
            setOnBreak(false);
            setBreakInterval((breakInterval) => breakInterval + 1);
            setTimeMin(25);
          }
        }
      }, 1000);
      return () => clearInterval(intervalPom);
    }
  }, [isRunning, timeMin, timeSec, workInterval, breakInterval, onBreak]);

  const startTimer = () => {
    clockLoop.play();
    setIsRunning(true);
    setOnPause(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clockLoop.stop();
    setOnPause(true);
  };

  const stopTimer = () => {
    BellSfx.play();
    setIsRunning(false);
    setTimeMin(25);
    setTimeSec(0);
    setOnPause(false);
    setWorkInterval(0);
  };

  const reduceTime = () => {
    if (timeMin > 0) {
      setTimeMin((timeMin) => timeMin - 1);
    }
  };

  const increaseTime = () => {
    if (timeMin < 100) {
      setTimeMin((timeMin) => timeMin + 1);
    }
  };

  return (
    <Layout>
      <div className="mx-5 mb-32 mt-5">
        <h1 className="text-3xl font-bold text-[#404040]">Tugas Hari ini</h1>

        <div className="mt-5 w-full">
          {/* timer */}
          <div className="h-80 w-2/4 rounded-lg bg-white p-5 shadow-lg">
            <div className="flex justify-between">
              <span className="text-xl font-bold">
                <h2>Pomodoro</h2>
              </span>
              <span>
                <h2>Istirahat Pendek</h2>
              </span>
              <span>
                <h2>Istirahat Panjang</h2>
              </span>
            </div>
            <div className="mt-16 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold">
                {timeMin < 10 ? `0${timeMin}` : timeMin}:
                {timeSec < 10 ? `0${timeSec}` : timeSec}
              </h2>
              <div>
                <button className="mx-5 text-xl" onClick={increaseTime}>
                  +
                </button>
                <button className="mx-5 text-xl" onClick={reduceTime}>
                  -
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2">
              <div className="flex justify-center ">
                {isRunning ? (
                  <button
                    className=" rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md"
                    onClick={pauseTimer}
                  >
                    Berhenti Sebentar
                  </button>
                ) : (
                  <>
                    <button
                      className=" mr-3 rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md"
                      onClick={startTimer}
                    >
                      Mulai
                    </button>
                  </>
                )}
                {onPause && (
                  <button
                    className=" rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md"
                    onClick={stopTimer}
                  >
                    Berhenti
                  </button>
                )}
              </div>
              <div className="mt-3">
                <h1> #Pomodoro {workInterval}/12</h1>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex justify-between">
            <div>
              <button
                className="text-md rounded-full bg-[#F16464] px-6 py-3 text-white shadow-lg"
                onClick={() => setOpenModal("default")}
              >
                Tambah Tugas
              </button>
              <ModalTugas openModal={openModal} setOpenModal={setOpenModal} />
            </div>
            <button className=" rounded-lg bg-white px-8 py-2  shadow-lg">
              Urutkan Berdasarkan Status
            </button>
          </div>

          <table className="w-full table-auto rounded-xl bg-white py-10 shadow-lg">
            <thead className="mx-3 border-b-4">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Judul Tugas
                </th>
                <th scope="col" className="px-6 py-3">
                  Waktu Pengerjaan
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Estimasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Real
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-sky-200">
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="px-6 py-3"></td>
                <td scope="col" className="flex px-6 py-3">
                  <span
                    className="hover: mr-2 h-8 w-8 cursor-pointer
                    hover:text-sky-500"
                  ></span>
                  <span className="h-8 w-8 cursor-pointer hover:text-red-500"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TugasHariIni;
