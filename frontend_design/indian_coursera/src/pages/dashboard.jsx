import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/dashboard/sidebar"
function Dashboard() {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);

  if (profileloading || authloading) {
    return <div className="text-white">loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR (fixed) */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1">

       

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
export default Dashboard;