import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/coursedetailesapi";

import Iconbutton from "../../common/iconbutton";
import Coursestable from "./instrouctorcourses/coursetable";

function Mycourses() {

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [courses, setcourses] = useState([]);

  useEffect(() => {

    const fetchcourses = async () => {

      const result = await fetchInstructorCourses(token);

      if (result) {
        setcourses(result);
      }
    };

    fetchcourses();

  }, []);

  return (

    <div className="min-h-screen bg-gray-950 p-6 text-white">

      {/* TOP SECTION */}
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            My Courses
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage all your created courses here
          </p>

        </div>

        <Iconbutton
          text="Add Course"
          onClick={() => navigate("/dashboard/addcourse")}
          customclasses="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-95 hover:bg-yellow-300"
        />

      </div>

      {/* COURSE TABLE */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-lg">

        {
          courses?.length > 0 ? (

            <Coursestable
              courses={courses}
              setcourses={setcourses}
            />

          ) : (

            <div className="flex h-[300px] items-center justify-center">

              <p className="text-lg text-gray-400">
                No courses found
              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Mycourses;