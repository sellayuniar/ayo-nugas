import NavDashboard from "@/components/NavDashboard";
import Sidebar from "@/components/SideBar/Sidebar";
import { useStateContext } from "@/context/ContextProvider";

export default function Layout({ children }) {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <div className="relative flex">
        {activeMenu ? (
          <div className="sidebar fixed w-72 bg-white shadow">
            <Sidebar />
          </div>
        ) : (
          <div className="hidden w-0">
            <Sidebar />
          </div>
        )}
        <div
          className={`min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed w-full bg-white md:static">
            <NavDashboard />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
