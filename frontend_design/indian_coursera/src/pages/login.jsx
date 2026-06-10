import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Ctabutton from "../components/core/homepage/ctabutton";
import loginimg from "../assets/Images/login.webp";
import { Link } from "react-router-dom";
import frame from "../assets/Images/frame.png";
import { apiconnector } from "../services/apiconnector";
import { authEndpoints } from "../services/apis";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setToken } from "../slices/authslice";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    roll: "student",

    email: "",

    password: "",
  });
  function changehandler(event) {
    setdata((prevdata) => {
      const { name, type, checked, value } = event.target; //derefferancing event.target kya h ->jis bhi element par click kiya h vo hai ye
      return {
        ...prevdata,
        // [event.target.name]: event.target.value,//if you do derefferencing then we can write [name]:value
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  async function submithandler(event) {
    event.preventDefault();

    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await apiconnector(
        "POST",
        authEndpoints.LOGIN_API,
        payload,
      );

      console.log("Login success:", response.data);
      dispatch(setToken(response.data.token));
      // 🔥 save token (important)
      localStorage.setItem("token", response.data.token);
      toast.success("logged in successfully");
    } catch (error) {
      console.log("Login failed:", error);
      toast.error("error in logging in");
    }
  }
  function rollmanager(newroll) {
    setdata({ ...data, roll: newroll });
  }
  console.log(data);
  return (
    <div className="flex flex-row p-6 w-225 items-center mx-auto mt-10">
      <div>
        <div>
          <div className="text-white font-bold text-3xl">Welcome Back</div>
          <div className="text-white  my-4">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="text-[#537988] ">
              Education to future proof your career.
            </span>
          </div>
          <div
            className={`flex flex-row cursor-pointer gap-5 text-white p-1.5 bg-[#01212A] w-fit items-center justify-around rounded-full`}
          >
            <div
              onClick={() => rollmanager("student")}
              className={`px-4 py-1 rounded-full cursor-pointer ${
                data.roll === "student" ? "bg-[#424854]" : ""
              }`}
            >
              Student
            </div>
            <div
              onClick={() => rollmanager("instructor")}
              className={`px-4 py-1 rounded-full cursor-pointer ${
                data.roll === "instructor" ? "bg-[#424854]" : ""
              }`}
            >
              Instructor
            </div>
          </div>
          <form className="text-white p-2.5" onSubmit={submithandler}>
            <div className="flex flex-col ">
              <label htmlFor="email">
                email address <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                type="email"
                name="email"
                placeholder="enter your email here "
                onChange={changehandler}
                value={data.email}
              ></input>
            </div>
            <br></br>

            <div className="flex flex-row gap-4 mb-2.5">
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1">
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="relative ">
                  <input
                    className="w-full border border-gray-400 focus:border-blue-500 outline-none p-2 rounded-xl pr-10"
                    placeholder="enter password"
                    onChange={changehandler}
                    value={data.password}
                    name="password"
                    type={showPassword ? "text" : "password"} // 🔥 toggle here
                  />

                  {/* Toggle Button */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-sm text-gray-300"
                  >
                    {!showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 w-full rounded cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-2 text-right">
            <Link
              to="/resetpassword"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-fit mt-6">
        <div className="relative ml-20">
          {/* Background Frame */}
          <img src={frame} className="block" />

          {/* Foreground Image */}
          <img
            src={loginimg}
            className="absolute top-35 left-40 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
