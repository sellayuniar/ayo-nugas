import Home from "@/assets/icons/Home";
import Report from "@/assets/icons/Report";
import Docs from "@/assets/icons/Docs";
import DocCheklist from "@/assets/icons/DocCheklist";
import HomeActive from "@/assets/icons/HomeActive";
import DocsActive from "@/assets/icons/DocsActive";
import DocsCheklistActive from "@/assets/icons/DocCheklistActive";
import ReportActive from "@/assets/icons/ReportActive";

export const dataSidebarLink = [
  {
    id: 1,
    title: "Dashboard",
    slug: "/dashboard",
    icon: <Home />,
    iconActive: <HomeActive />,
  },
  {
    id: 2,
    title: "Inventaris Tugas",
    slug: "/inventaris-tugas",
    icon: <Docs />,
    iconActive: <DocsActive />,
  },
  {
    id: 3,
    title: "Tugas Hari ini",
    slug: "/tugas-hari-ini",
    icon: <DocCheklist />,
    iconActive: <DocsCheklistActive />,
  },
  {
    id: 4,
    title: "Laporan",
    slug: "/laporan",
    icon: <Report />,
    iconActive: <ReportActive />,
  },
];
