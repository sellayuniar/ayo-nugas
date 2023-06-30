import NavBar from "@/components/Navbar";
import CoverImg from "@/assets/ImgSvg/CoverImg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <NavBar />
      <div className="md:justy-center flex h-[600px] w-full items-start justify-evenly bg-[#FDECEC] pt-24 md:pt-36">
        <div className="mt-5 flex w-full flex-col px-20 lg:w-5/12 lg:pb-5">
          <h1 className="text-3xl font-bold leading-[50px]">
            Sistem Informasi Pengerjaan Tugas dengan Teknik Pomodoro
          </h1>
          <h3 className="w-3/4 py-5 text-2xl lg:w-full lg:py-5">
            Segera Kerjakan tugas kuliahmu dengan teknik pomodoro
          </h3>
          <button
            className="mt-5 h-12 w-64 rounded-full bg-[#EE3D3D] text-xl text-white shadow-lg hover:bg-[#d63737]"
            onClick={() => {
              router.push("/masuk");
            }}
          >
            Mulai
          </button>
        </div>
        <div className="hidden basis-2/4 lg:block">
          <CoverImg />
        </div>
      </div>
    </main>
  );
}
