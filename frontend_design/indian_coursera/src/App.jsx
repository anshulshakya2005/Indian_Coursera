import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Resetpassword from "./pages/resetpassword";
import Navbar from "./components/common/navbar";
import Updatepassword from "./pages/updatepassword";
import About from "./pages/about";
import Dashboard from "./pages/dashboard";
import Myprofile from "./components/core/dashboard/myprofile";
import Privateroute from "./components/core/auth/privateroute";
import Openroute from "./components/core/auth/openroute";
import Errors from "./pages/error";
import Settings from "./components/core/dashboard/settings";
import Addcourse from "./components/core/dashboard/addcourse";
import Mycourses from "./components/core/dashboard/mycourses";
import Catalog from "./pages/catalog";
import CourseDetailsCard from "./components/core/course/coursedetailscard";
import CourseDetails from "./pages/coursesss";
import Enrolledcourses from "./components/core/dashboard/enrolledcourses";
import Cart from "./components/core/dashboard/cart/index"
import ViewCourse from "./pages/viewcourse";
import VideoDetails from "./components/core/viewcourse/VideoDetails"
import Instructor from "./components/core/dashboard/instructordashboard/instructor";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
   const { user } = useSelector((state) => state.profile)
  return (
    <div
      className="w-screen min-h-screen bg-[#000814] flex flex-col "
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="/category/:something" element={<Catalog/>}></Route>
        <Route
          path="/signup"
          element={
            <Openroute>
              <Signup />
            </Openroute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Openroute>
              <Login />
            </Openroute>
          }
        ></Route>

        <Route
          path="/resetpassword"
          element={
            <Openroute>
              <Resetpassword />
            </Openroute>
          }
        ></Route>
        <Route
          path="/update-password/:id"
          element={<Updatepassword></Updatepassword>}
        ></Route>

        <Route path="/about" element={<About></About>} />
      
        <Route
          path="/dashboard"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        >
          <Route path="myprofile" element={<Myprofile />} />
          <Route path="settings" element={<Settings />} />

                  {
          user?.accounttype ==="instructor" && (
            <>
            <Route path="addcourse" element={<Addcourse></Addcourse>}></Route>
            <Route path="instructor" element={<Instructor/>}/>
            </>
          )
        }
        {
          user?.accounttype === "student" &&(
            <>
            <Route path="enrolledcourses" element={<Enrolledcourses></Enrolledcourses>} ></Route>
            <Route path="enrolled-courses" element={<Enrolledcourses></Enrolledcourses>}/>
            <Route path="cart" element={<Cart/>}/>
            </>
          )
        }
        {
          user?.accounttype === "instructor"&&(
            <>
            <Route path="mycourses" element={<Mycourses/>}></Route>

            </>
          )
        }
        </Route>

<Route path="" element={<ViewCourse/>}>
{
  user?.accounttype==="student"&&(
    <>
    <Route path="view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element={<VideoDetails/>}></Route>
    </>
  )
}
</Route>


        <Route path="*" element={<Errors></Errors>}></Route>
      </Routes>
    </div>
  );
}

export default App;
