import { useState, useRef, useEffect } from "react";
import fetchprofile from "../../../services/operations/profileapi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profiledropdown() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    fetchprofile(dispatch);
  }, [dispatch]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Profile Image */}
      <img
        src={user?.image || "https://i.pravatar.cc/40"}
        alt="profile"
        className="w-7 h-7 rounded-full cursor-pointer"
        onClick={handleToggle}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/dashboard/myprofile">Dashboard</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profiledropdown;