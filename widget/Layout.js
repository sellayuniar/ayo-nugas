import SideBarDashboard from "@/components/SideBar/SideBarDashboard";
import NavDashboard from "@/components/NavDashboard";

export default function Layout({ children }) {
  return (
    <div className="container">
      {/* <div className="flex">
        <div className="basis-1/2">
          <SideBarDashboard />
        </div>
        <div className="basis-3/4">
          <NavDashboard />
          {children}
        </div>
      </div> */}
    </div>
  );
}
