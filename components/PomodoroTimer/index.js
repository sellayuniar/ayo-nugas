import { useEffect, useState } from "react";
import { Howl } from "howler";
import ClockMp3 from "@/public/media/clock.mp3";
import BellMp3 from "@/public/media/bell.mp3";
import { db } from "@/config/firebase";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import Head from "next/head";
import Fire from "@/assets/icons/Fire";
import Music from "@/assets/icons/Music";
import Star from "@/assets/icons/Star";

// assets
const clockLoop = new Howl({
  src: [ClockMp3],
  loop: true,
});

const BellSfx = new Howl({
  src: [BellMp3],
});

const PomodoroTimer = ({ propsPomodoroTimer }) => {
  const [dataTugas, setDataTugas] = useState({
    judul: "",
    catatan: "",
    waktuPengerjaan: "",
    tipe: "",
    kategori: "",
    status: "",
    estimasi: 0,
    real: 0,
    waktuPengerjaanReal: "",
    WaktuPengerjaanSelesai: "",
  });

  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [workInterval, setWorkInterval] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [onPause, setOnPause] = useState(false);
  const { idTugas, isPlay, setIsPlay, setFetchStatus, setIdTugas } =
    propsPomodoroTimer;
  const [mode, setMode] = useState("pomodoro");
  const [getDataStatus, setGetDataStatus] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isPlay) {
      getTugasById();
      setIsPlay(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlay]);

  const getTugasById = async () => {
    try {
      const tugasDocRef = doc(db, "tugas", idTugas || "");
      if (!idTugas) return false;
      const docSnap = await getDoc(tugasDocRef);
      const data = docSnap.data();
      setDataTugas({
        judul: data.judul_tugas,
        catatan: data.catatan,
        waktuPengerjaan: data.waktu_pengerjaan,
        tipe: data.tipe_tugas,
        kategori: data.kategori_tugas,
        status: data.status,
        estimasi: data.estimasi,
        real: data.real,
      });
      setWorkInterval(parseInt(data.real));
      setGetDataStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance("Tinggal 2 Menit lagi");

    u.lang = "id-ID";

    console.log(timeMin === 2 && timeSec === 0);
    if (timeMin === 2 && timeSec === 0) {
      synth.speak(u);
    }

    return () => {
      synth.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeMin, timeSec]);

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
              setMode("istirahat-panjang");
            } else {
              setTimeMin(5);
              setMode("istirahat-pendek");
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
    if (workInterval === 0 && getDataStatus) {
      updateStatusPengerjaan();
    }
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
    if (getDataStatus) {
      updatedataTugasEnd();
      setIdTugas("");
      setGetDataStatus(false);
    }
    setMode("pomodoro");
    setDataTugas({
      judul: "",
      catatan: "",
      waktuPengerjaan: "",
      tipe: "",
      kategori: "",
      status: "",
      estimasi: 0,
      real: 0,
      waktuPengerjaanReal: "",
      WaktuPengerjaanSelesai: "",
    });
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

  const updateStatusPengerjaan = async () => {
    const tugasDocRef = doc(db, "tugas", idTugas || "");
    await updateDoc(tugasDocRef, {
      status: "Sedang Dikerjakan",
    });
    setFetchStatus(true);
  };

  const updatedataTugasEnd = async () => {
    const tugasDocRef = doc(db, "tugas", idTugas || "");
    await updateDoc(tugasDocRef, {
      real: workInterval,
    });
    setFetchStatus(true);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Head>
          <title>
            {dataTugas.judul !== "" ? dataTugas.judul : "Pomodoro"}{" "}
            {timeMin < 10 ? `0${timeMin}` : timeMin}:
            {timeSec < 10 ? `0${timeSec}` : timeSec}
          </title>
        </Head>
        <span
          className={`${
            mode === "pomodoro" && "text-xl font-bold text-[#F05050]"
          } mx-5`}
        >
          <h2 className="hidden md:block">Pomodoro</h2>
          <span className={`block h-8 w-8 md:hidden`}>
            {mode === "pomodoro" ? <Fire color="#F05050" /> : <Fire />}
          </span>
        </span>
        <span
          className={`${
            mode === "istirahat-pendek" && "text-xl font-bold text-[#F05050]"
          } mx-10`}
        >
          <h2 className="hidden md:block">Istirahat Pendek</h2>
          <span className="block h-8 w-8 md:hidden">
            {mode === "istirahat-pendek" ? (
              <Music color="#F05050" />
            ) : (
              <Music />
            )}
          </span>
        </span>
        <span
          className={`${
            mode === "istirahat-panjang" && "text-xl font-bold text-[#F05050]"
          } mx-5`}
        >
          <h2 className="hidden md:block">Istirahat Panjang</h2>
          <span className="block h-8 w-8 md:hidden">
            {mode === "istirahat-panjang" ? <Star color="#F05050" /> : <Star />}
          </span>
        </span>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="">
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

        <div className="mt-8 flex flex-col items-center md:flex-row">
          {isRunning ? (
            <button
              className=" rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md hover:bg-[#d63737]"
              onClick={pauseTimer}
            >
              Berhenti Sebentar
            </button>
          ) : (
            <button
              className="mb-2 rounded-full bg-[#F16464] px-14 py-2 text-white shadow-md hover:bg-[#d63737] md:mr-3"
              onClick={startTimer}
            >
              Mulai
            </button>
          )}
          {onPause && (
            <button
              className=" rounded-full bg-[#F16464] px-12 py-2 text-white shadow-md hover:bg-[#d63737]"
              onClick={stopTimer}
            >
              Berhenti
            </button>
          )}
        </div>
        <div className="mt-5">
          <h1>
            #{dataTugas.judul !== "" ? dataTugas.judul : "Pomodoro"}{" "}
            {workInterval}/
            {dataTugas.estimasi !== "" ? dataTugas.estimasi : "0"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
