import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import Profiledropdown from "../core/auth/profiledropdown";
import { useState } from "react";
import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { apiconnector } from "../../services/apiconnector";
import { catagories } from "../../services/apis.jsx";
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sublink, setsublink] = useState([]);
   const location = useLocation();
  const fetchsublinks = async () => {
    try {
      const result = await apiconnector("GET", catagories.CATAGORIES_API);
      console.log("printing sublink result ", result);
      setsublink(result.data.allcatagories);
    } catch (err) {
      console.log("could not fetch the catalog list");
    }
  };

  useEffect(() => {
    fetchsublinks();
  }, []);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  function matchroute(route) {
   
    return matchPath({ path: route }, location.pathname);
  }
  console.log("TOKEN IN NAVBAR:", token);

  return (

    <div className="flex h-12 items-center border-b border-b-[#2C333F]">
      <div className="flex w-11/12 max-w-225 items-center justify-between p-4">
      
        <Link to="/">
          <img src={logo} width={160} height={32}></img>
        </Link>
        <nav>
          <ul className="flex gap-x-3 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
  className="relative"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  {/* Catalog Button */}
  <p
    className="cursor-pointer"
    onClick={() => setShowDropdown((prev) => !prev)}
  >
    Catalog
  </p>

  {/* Dropdown */}
  {showDropdown && (
    <div className="absolute left-0 top-full z-50 text-black w-52 rounded-md bg-white shadow-lg">
      {sublink.length > 0 ? (
        sublink.map((item) => (
          <Link to={`/category/${item.name
  .split(" ")
  .join("-")
  .toLowerCase()}`} key={item._id}>
            <p className="px-4 py-2 hover:bg-gray-200">
              {item.name.trim()}
            </p>
          </Link>
        ))
      ) : (
        <p className="px-4 py-2">Loading...</p>
      )}
    </div>
  )}
</div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchroute(link?.path) ? "text-yellow-200" : "text-white"}`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-x-3 items-center">
          {/* 🛒 Cart */}
          {user && user.accounttype !== "instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping className="text-white" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* 🔐 Auth Buttons */}
          {token === null && (
            <>
              <Link to="/login">
                <button className="border border-[#2C333F] bg-[#161D29] px-2.25 py-0.75 text-white rounded-md">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="border border-[#2C333F] bg-[#161D29] px-2.25 py-0.75 text-white rounded-md">
                  Signup
                </button>
              </Link>
            </>
          )}

          {/* 👤 Profile */}
          {token !== null && <Profiledropdown />}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
