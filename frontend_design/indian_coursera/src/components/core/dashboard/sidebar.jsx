import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authapi";
import { useNavigate } from "react-router-dom";
import Sidebarlink from "./sidebarlink";
import { useState } from "react";
import Confirmationmodal from "../../common/confirmationmodal";
function Sidebar() {
  const { user, loading: profileloading } = useSelector(
    (state) => state.profile,
  );
  const { loading: authloading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationmodal, setconfirmationmodal] = useState(null); //starting me mere pass data nahi h ki modal me kya show hona chahiye

  if (profileloading || authloading) {
    return <div className="text-white">loading...</div>;
  }

  return (
    <div>
      <div className="flex min-w-[150px] flex-col border-r-[1px] border-white h-[calc(100vh-3.5rem)] bg-[#2C333F] py-8">
        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accounttype !== link.type) return null;
            return (
              <Sidebarlink link={link} iconname={link.icon} key={link.id} />
            );
          })}
        </div>

        <div className="mx-auto mt-3  h-[1px] w-10/12 bg-amber-50"></div>

        <div className="flex flex-col ">
          <Sidebarlink
            link={{ name: "settings", path: "settings" }}
            iconname={"VscSettingsGear"}
          ></Sidebarlink>
        </div>
        <button
  onClick={() =>
    setconfirmationmodal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1handler: () => {
        dispatch(logout(navigate));
        setconfirmationmodal(null);
      },
      btn2handler: () => setconfirmationmodal(null),
    })
  }
  className="mt-6 mx-4 flex items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-medium 
  text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
>
  <span>Logout</span>
</button>
      </div>

      {confirmationmodal && <Confirmationmodal modaldata={confirmationmodal} />}
    </div>
  );
}
export default Sidebar;
