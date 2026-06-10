import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/coursedetailesapi";
import { getinstructordata } from "../../../../services/operations/profileapi";
import { Link } from "react-router-dom";
import Instructorchart from "./Instructorchart";
function Instructor(){
    const {token} = useSelector((state)=>state.auth);
     const [loading,setloading] = useState(false);
        const [instructor,setinstructor] = useState(null);
        const [courses,setcourses] = useState([]);
        const {user} = useSelector((state)=>state.profile);
   useEffect(() => {
  if (!token) return;

  const getcoursedatawithstats = async () => {
    setloading(true);

    const instructorapidata = await getinstructordata(token);
    const result = await fetchInstructorCourses(token);

    console.log(instructorapidata);

    if (instructorapidata) {
      setinstructor(instructorapidata);
    }

    if (result) {
      setcourses(result);
    }

    setloading(false);
  };

  getcoursedatawithstats();
}, [token]);

    const totalAmount = instructor?.reduce((acc,crr)=>acc+crr.totalamountgenerated,0);
    const totalStudents = instructor?.reduce((acc,curr)=>acc+curr.totalstudentsenrolled,0);
return (
  <div className="min-h-screen bg-[#0B0F19] text-white p-6">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-yellow-400">
        {user?.firstname}
      </h1>
      <p className="text-gray-400 text-sm">
        Let’s start something new 🚀
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : courses.length > 0 ? (
      <div className="space-y-6">

        {/* 🔥 TOP SECTION: CHART + STATS SIDE BY SIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex gap-2">
             {/* PIE CHART (LEFT BIG AREA) */}
          <div className="lg:col-span-1 bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-lg flex justify-center items-center">
            <Instructorchart courses={instructor} />
          </div>

          {/* STATS (RIGHT SIDE) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-yellow-400 transition">
              <p className="text-gray-400 text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-white mt-2">
                {courses.length}
              </p>
            </div>

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-blue-400 transition">
              <p className="text-gray-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-white mt-2">
                {totalStudents}
              </p>
            </div>

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-green-400 transition sm:col-span-2">
              <p className="text-gray-400 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-white mt-2">
                ₹{totalAmount}
              </p>
            </div>

          </div>
        </div>
         
        </div>

        {/* 📚 COURSES SECTION (BOTTOM FULL WIDTH) */}
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">

          <div className="flex justify-between items-center mb-5">
            <p className="text-lg font-semibold text-white">
              Your Courses
            </p>

            <Link
              to="/dashboard/mycourses"
              className="text-sm text-yellow-400 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course, index) => (
              <div
                key={index}
                className="bg-[#0B0F19] p-3 rounded-lg border border-gray-800 hover:bg-[#111827] transition flex gap-3"
              >
                <img
                  src={course.thumbnail}
                  className="w-14 h-14 rounded object-cover"
                />

                <div>
                  <p className="font-medium text-white">
                    {course.coursename}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {course.studentsenrolled.length} students • ₹{course.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    ) : (
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 text-center">
        <p className="text-gray-400">
          You have not created any courses yet
        </p>

        <Link
          to="/dashboard/addcourse"
          className="inline-block mt-3 text-yellow-400 hover:underline"
        >
          Create Course →
        </Link>
      </div>
    )}
  </div>
);
}
export default Instructor;