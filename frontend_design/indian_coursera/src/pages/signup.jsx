import { useState } from "react";
import Ctabutton from "../components/core/homepage/ctabutton";
import Highlighttext from "../components/core/homepage/highlighttext";
import { FaStarOfLife } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import signinimg from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import { authEndpoints } from "../services/apis";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiconnector } from "../services/apiconnector";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmpassword] = useState(false);
  const [data, setdata] = useState({
    roll: "student",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    createpassword: "",
    confirmpassword: "",
    otp:"",
  });
   async function sendOtpHandler() {
  if (!data.email) {
    toast.error("Please enter email first");
    return;
  }

  try {
    const response = await apiconnector(
      "POST",
      authEndpoints.SEND_OTP_API,
      {
        email: data.email,
      }
    );

    console.log("OTP Sent:", response.data);

    toast.success("OTP sent successfully 📩");
  } catch (error) {
    console.log("OTP Error:", error);

    toast.error(
      error?.response?.data?.message || "Failed to send OTP ❌"
    );
  }
}
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
    console.log("Sending data:", data);
    const payload = {
  accounttype: data.roll,
  firstname: data.firstname,
  lastname: data.lastname,
  email: data.email,
  password: data.createpassword,
  confirmpassword: data.confirmpassword,
  contact: data.phone,
  otp:data.otp,
};
    const response = await apiconnector(
      "POST",
      authEndpoints.SIGNUP_API,
      payload
    );
    toast.success("signed up");
    console.log("Signup Success:", response.data);

  } catch (error) {
    console.log("Signup Failed:", error);
  }
}
  function rollmanager(newroll) {
    setdata({ ...data, roll: newroll });
  }
  console.log(data);
  return (
    <div className="flex flex-row p-6 w-225 items-center mx-auto">
      <div>
        <div>
          <div className="text-white font-bold text-3xl">
            Join the millions learning to code with StudyNotion for free
          </div>
          <div className="text-white">
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
        </div>
        <form className="text-white p-2.5" onSubmit={submithandler}>
          <div className="flex gap-3 ">
            <div className="flex flex-col">
              <label htmlFor="firstname">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                type="text"
                placeholder="first name"
                onChange={changehandler}
                name="firstname"
                value={data.firstname}
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname">
                lastname <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                type="text"
                placeholder="last name"
                onChange={changehandler}
                name="lastname"
                value={data.lastname}
              ></input>
            </div>
          </div>
          <br />
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
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-2">
              <select
                name="code"
                className="border border-gray-400 rounded-xl p-2 bg-transparent"
              >
                <option value="+91">+91</option>
                <option value="+009">+009</option>
              </select>

              <input
                className="flex-1 border border-gray-400 focus:border-blue-500 outline-none p-2 rounded-xl"
                type="tel"
                name="phone"
                value={data.phone}
                onChange={changehandler}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 mb-2.5">
            <div className="flex flex-col">
              <label htmlFor="createpassword" className="mb-1">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative ">
                <input
                  className="w-full border border-gray-400 focus:border-blue-500 outline-none p-2 rounded-xl pr-10"
                  placeholder="Create password"
                  onChange={changehandler}
                  value={data.createpassword}
                  name="createpassword"
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
            <div className="flex flex-col">
              <label htmlFor="confirmpassword" className="mb-1">
                confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative ">
                <input
                  className="w-full border border-gray-400 focus:border-blue-500 outline-none p-2 rounded-xl pr-10"
                  placeholder="confirm password"
                  onChange={changehandler}
                  value={data.confirmpassword}
                  name="confirmpassword"
                  type={showconfirmPassword ? "text" : "password"} // 🔥 toggle here
                />

                {/* Toggle Button */}
                <span
                  onClick={() => setshowconfirmpassword(!showconfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-sm text-gray-300"
                >
                  {!showconfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
          </div>
<div className="flex flex-col">
  <label>
    Enter OTP <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    name="otp"
    value={data.otp}
    onChange={changehandler}
    placeholder="Enter OTP"
    className="border p-2 rounded-xl"
  />
</div>
<button
  type="button"
  onClick={sendOtpHandler}
  className="bg-blue-500 px-3 py-1 rounded"
>
  Send OTP
</button>
           <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 w-full rounded cursor-pointer"
            >
              Signup
            </button>
        </form>
      </div>
      <div className="relative w-fit">
        <div className="relative ml-20">
          {/* Background Frame */}
          <img src={frame} className="block" />

          {/* Foreground Image */}
          <img
            src={signinimg}
            className="absolute top-27.5 left-32.5 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}
export default Signup;
