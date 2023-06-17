import Link from "next/link";
import { dataSidebarLink } from "@/data/dataSidebarLink";
import { useStateContext } from "@/context/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-full text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-full text-md text-gray-700";

  return (
    <div className="ml-3 h-screen overflow-auto px-12 pb-10 md:overflow-hidden md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="mt-5 flex items-center justify-between">
            <Link
              href=""
              onClick={() => {
                setActiveMenu(false);
              }}
              className="items-center text-xl"
            >
              Ayo Nugas
            </Link>
          </div>
          <div className="mt-10">
            <div className="m-3 mt-4 text-gray-900">
              {dataSidebarLink.map((data) => (
                <Link
                  href={`${data.slug}`}
                  key={data.id}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {data.icon}
                  <span> {data.title} </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
