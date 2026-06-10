import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import Confirmationmodal from "../../../common/confirmationmodal";

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/coursedetailesapi";

import { setCourse, setEditCourse, setStep } from "../../../../slices/courseslice";

function Coursestable({ courses, setcourses }) {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [loading, setloading] = useState(false);

  const [confirmationmodal, setconfirmationmodal] = useState(null);

  const handlecoursedelete = async (courseid) => {

    setloading(true);

    await deleteCourse({ courseid: courseid }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setcourses(result);
    }

    setconfirmationmodal(null);

    setloading(false);
  };
const navigate = useNavigate();
  const handleeditfunc= async (course)=>{
    // dispatch(setStep(1));
    //     dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
    navigate("/dashboard/addcourse")
  }
  return (

    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">

      <Table className="w-full">

        {/* TABLE HEADER */}
        <Thead>

          <Tr className="border-b border-gray-700 text-left">

            <Th className="pb-4 text-sm font-semibold text-white">
              Courses
            </Th>

            <Th className="pb-4 text-sm font-semibold text-white">
              Duration
            </Th>

            <Th className="pb-4 text-sm font-semibold text-white">
              Price
            </Th>

            <Th className="pb-4 text-sm font-semibold text-white">
              Actions
            </Th>

          </Tr>

        </Thead>

        {/* TABLE BODY */}
        <Tbody>

          {
            courses?.length === 0 ? (

              <Tr>
                <Td className="py-10 text-center text-gray-300">
                  No courses found
                </Td>
              </Tr>

            ) : (

              courses?.map((course) => (

                <Tr
                  key={course._id}
                  className="border-b border-gray-700"
                >

                  {/* COURSE INFO */}
                  <Td className="py-6">

                    <div className="flex gap-4">

                      <img
                        src={course?.thumbnail}
                        alt={course?.coursename}
                        className="h-[100px] w-[180px] rounded-lg object-cover"
                      />

                      <div className="flex flex-col gap-2">

                        <p className="text-lg font-semibold text-white">
                          {course.coursename}
                        </p>

                        <p className="max-w-[300px] text-sm text-gray-300">
                          {course.coursedescription}
                        </p>

                        <div className="flex items-center gap-2 text-xs">

                          <span className="text-gray-400">
                            Status:
                          </span>

                          {
                            (course.status === "Draft" ||
                              course.status === "draft") ? (

                              <span className="rounded-full bg-pink-500/20 px-2 py-1 text-pink-300">
                                Draft
                              </span>

                            ) : (

                              <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-yellow-300">
                                Published
                              </span>

                            )
                          }

                        </div>

                      </div>

                    </div>

                  </Td>

                  {/* DURATION */}
                  <Td className="text-white">
                    2hr 30min
                  </Td>

                  {/* PRICE */}
                  <Td className="text-white">
                    ₹{course.price}
                  </Td>

                  {/* ACTIONS */}
                  <Td>

                    <div className="flex items-center gap-3">

                      <button
                      onClick={()=>handleeditfunc(course)}
                        disabled={loading}
                        className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-600"
                      >
                        Edit
                      </button>

                      <button
                        disabled={loading}
                        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600"
                        onClick={() => {

                          setconfirmationmodal({
                            text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",

                            btn1handler: !loading
                              ? () => handlecoursedelete(course._id)
                              : () => {},

                            btn2handler: !loading
                              ? () => setconfirmationmodal(null)
                              : () => {},
                          });

                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </Td>

                </Tr>

              ))
            )
          }

        </Tbody>

      </Table>

      {
        confirmationmodal && (
          <Confirmationmodal modaldata={confirmationmodal} />
        )
      }

    </div>
  );
}

export default Coursestable;