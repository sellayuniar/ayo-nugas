import SidenavItems from "./Items";
import SidenavHeader from "./Header";
import css from "./index.module.css";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const style = {
  mobilePosition: {
    left: "left-0",
    right: "right-0",
  },
  close: `hidden`,
  container: `pb-32 lg:pb-6`,
  open: `absolute w-8/12 z-40 sm:w-5/12`,
  default: `bg-white shadow h-screen overflow-y-auto top-0 lg:block lg:relative lg:w-64 lg:z-auto`,
};

export default function Sidebar({ mobilePosition }) {
  const { state } = useContext(GlobalContext);
  const { isSidebar } = state;
  return (
    <aside
      className={`${isSidebar ? style.open : style.close} ${style.default} ${
        style.mobilePosition[mobilePosition]
      }`}
    >
      <div className={style.container}>
        <SidenavHeader />
        <SidenavItems />
      </div>
    </aside>
  );
}
