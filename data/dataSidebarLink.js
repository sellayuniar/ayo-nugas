import Home from "@/assets/icons/Home";
import Report from "@/assets/icons/Report";
import Docs from "@/assets/icons/Docs";
import DocCheklist from "@/assets/icons/DocCheklist";

export const dataSidebarLink = [
  {
    id: 1,
    title: "Dashboard",
    slug: "/dashboard",
    icon: <Home />,
  },
  {
    id: 2,
    title: "Inventaris Tugas",
    slug: "/",
    icon: <Docs />,
  },
  {
    id: 3,
    title: "Tugas Hari ini",
    slug: "/tugas-hari-ini",
    icon: <DocCheklist />,
  },
  {
    id: 4,
    title: "Laporan",
    slug: "/",
    icon: <Report />,
  },
];
