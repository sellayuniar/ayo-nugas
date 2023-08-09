import NavBar from "@/components/Navbar/index.js";
import CoverImg from "@/assets/ImgSvg/CoverImg";
import { useRouter } from "next/router";
import AccordionItems from "@/components/Accordion";
import Question from "@/public/undraw_questions.svg";
import Image from "next/image";
import Time from "@/public/undraw_time_management.svg";
import ImgWebPomodoro from "@/assets/ImgSvg/ImgWebPomodoro";
import DocCheklist from "@/assets/icons/DocCheklist";
import Notification from "@/assets/icons/Notification";
import Report from "@/assets/icons/Report";
import Clock from "@/assets/icons/Clock";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <NavBar />
      <div className="container-fluid">
        <div className="md:justy-center flex h-[600px] w-full items-start justify-evenly bg-[#FDECEC] px-20 pt-24 md:pt-36">
          <div className="mt-5 flex w-full flex-col  lg:w-5/12 lg:pb-5">
            <h1 className="text-3xl font-bold leading-[50px]">
              Sistem Informasi Pengerjaan Tugas berbasis Teknik Pomodoro
            </h1>
            <h3 className="w-3/4 py-5 text-2xl lg:w-full lg:py-5">
              Segera Kerjakan tugas kuliahmu dengan teknik pomodoro
            </h3>
            <button
              className="mt-5 h-12 w-64 rounded-full bg-[#EE3D3D] text-xl text-white shadow-lg hover:bg-[#d63737]"
              onClick={() => {
                router.push("/daftar");
              }}
            >
              Mulai
            </button>
          </div>
          <div className="hidden basis-2/4 lg:block">
            <CoverImg />
          </div>
        </div>
        <div
          className="flex items-center justify-center px-20 py-20"
          id="tentang"
        >
          <div className="hidden w-2/4 lg:block">
            <Image src={Question} alt="" height={400} width={400} />
          </div>
          <div className="w-full lg:w-2/4">
            <h3 className="mb-5 text-2xl font-semibold">Apa itu Ayo Nugas?</h3>
            <p className="">
              Ayo Nugas adalah sistem informasi pengerjaan tugas berbasis teknik
              pomodoro yang bertujuan mengurangi perilaku prokrastinasi akademik
              pada pada mahasiswa Program Studi Sistem Informasi UPN “Veteran”
              Jawa Timur.
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between bg-[#FDECEC] px-20 py-20">
          <div className="w-full lg:w-3/5">
            <h3 className="mb-5 text-2xl font-semibold">
              Apa itu Teknik Pomodoro?
            </h3>
            <p>
              Teknik pomodoro merupakan sistem manajemen waktu yang menggugah
              orang untuk bekerja secara fokus dalam rentang waktu. Tujuan dari
              teknik pomodoro adalah untuk melatih seseorang untuk tidak
              menunda-nunda tugas dan berani memulai untuk mengerjakan
              tugas-tugasnya.
            </p>
          </div>
          <div className="hidden w-2/5 justify-end lg:flex">
            <Image src={Time} alt="" height={300} width={300} />
          </div>
        </div>
        <div className="flex justify-between px-20 py-20">
          <div className="hidden h-full xl:block xl:w-2/4 ">
            <ImgWebPomodoro />
          </div>
          <div className="w-full xl:w-2/4">
            <h3 className="mb-5 text-2xl font-semibold">
              Cara Menggunakan Ayo Nugas
            </h3>
            <AccordionItems />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#FDECEC] px-20 py-20">
          <div className="mb-10">
            <h3 className="text-2xl font-semibold">Fitur Utama</h3>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="mr-10 flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-white shadow-md ">
              <span className="mb-2 h-10 w-10">
                <DocCheklist />
              </span>
              <h3>Inventaris Tugas</h3>
            </div>
            <div className="mr-10 flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-white shadow-md">
              <span className="mb-2 h-10 w-10">
                <Clock />
              </span>
              <h3 className="text-center">
                List Tugas Hari ini & Pomodoro Timer
              </h3>
            </div>
            <div className="mr-10 flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-white  shadow-md">
              <span className="mb-2 h-10 w-10">
                <Notification />
              </span>
              <h3>Notifikasi</h3>
            </div>
            <div className="flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-white shadow-md">
              <span className="mb-2 h-10 w-10">
                <Report />
              </span>
              <h3>Laporan</h3>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between px-20 py-10">
          <div className="w-full">
            <h3>Quote</h3>
          </div>
        </div> */}
        <div className="flex justify-center border-t-2 px-20 py-5">
          <h3 className="text-center">Copyright Ayo Nugas 2023</h3>
        </div>
      </div>
    </main>
  );
}
