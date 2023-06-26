import SidenavItems from "./Items";
import SidenavHeader from "./Header";
import css from "./index.module.css";
// import { useToggle } from "@/context/ContextProvider";

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
  // const { open, ref } = useToggle();
  return (
    <aside
      // ref={ref}
      className={`${style.default} ${style.mobilePosition[mobilePosition]}`}
    >
      <div className={style.container}>
        <SidenavHeader />
        <SidenavItems />
      </div>
    </aside>
  );
}
