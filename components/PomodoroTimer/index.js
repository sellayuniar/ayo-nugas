import { useEffect, useState } from "react";
import { Howl } from "howler";
import ClockMp3 from "@/public/media/clock.mp3";
import BellMp3 from "@/public/media/bell.mp3";
import { db } from "@/config/firebase";
import { addDoc, updateDoc, getDoc, doc, collection } from "firebase/firestore";
import Cookies from "js-cookie";

// assets
const clockLoop = new Howl({
  src: [ClockMp3],
  loop: true,
});

const BellSfx = new Howl({
  src: [BellMp3],
});

const PomodoroTimer = ({ propsPomodoroTimer }) => {
  const [dataPomodoro, setDataPomodoro] = useState({
    uid: "",
    idTugas: "",
    emailUser: "",
    judulTugas: "",
    real: "",
    estimasi: "",
    waktuPengerjaan: "",
    waktuSelesaiPengerjaan: "",
  });

  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [workInterval, setWorkInterval] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [onPause, setOnPause] = useState(false);

  const { idTugas, isPlay, setIsPlay, idPomodoro, setFetchStatus } =
    propsPomodoroTimer;

  useEffect(() => {
    if (isPlay) {
      getTugasById();
      setIsPlay(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlay]);

  const getTugasById = async () => {
    try {
      const pomodoroDocRef = doc(db, "pomodoro", idPomodoro || "");
      if (!idPomodoro) return false;
      const docSnap = await getDoc(pomodoroDocRef);
      const dataPomodoro = docSnap.data();
      setDataPomodoro({
        uid: dataPomodoro.uid,
        emailUser: dataPomodoro.email_user,
        idPomodoro: idPomodoro,
        judulTugas: dataPomodoro.judul_tugas,
        estimasi: dataPomodoro.estimasi,
        real: dataPomodoro.real,
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log(dataPomodoro);
  console.log(idPomodoro);

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
    if (workInterval === 0) {
      updateDataPomodoroStart();
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
    updateDataPomodoroEnd();
    updateDataTugas();
    setDataPomodoro({
      uid: "",
      idTugas: "",
      emailUser: "",
      judulTugas: "",
      real: "",
      estimasi: "",
      waktuPengerjaan: "",
      waktuSelesaiPengerjaan: "",
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

  const timestamp = Date.now();

  const updateDataPomodoroStart = async () => {
    const pomodoroDocRef = doc(db, "pomodoro", idPomodoro || "");
    await updateDoc(pomodoroDocRef, {
      waktu_pengerjaan_real: timestamp,
    });
  };

  const updateDataPomodoroEnd = async () => {
    const pomodoroDocRef = doc(db, "pomodoro", idPomodoro || "");
    await updateDoc(pomodoroDocRef, {
      waktu_selesai_pengerjaan: timestamp,
      real: workInterval,
    });
  };

  const updateDataTugas = async () => {
    const tugasDocRef = doc(db, "tugas", idTugas || "");
    await updateDoc(tugasDocRef, {
      real: workInterval,
    });
    setFetchStatus(true);
  };

  const workIntervalValue = () => {
    const value = parseInt(dataPomodoro.real) + workInterval;
    if (dataPomodoro.real === undefined || dataPomodoro.real === "") {
      return workInterval;
    } else if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  };

  return (
    <>
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
          <h1>
            #
            {dataPomodoro.judulTugas !== ""
              ? dataPomodoro.judulTugas
              : "Pomodoro"}{" "}
            {workIntervalValue()}/
            {dataPomodoro.estimasi !== "" ? dataPomodoro.estimasi : "0"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
