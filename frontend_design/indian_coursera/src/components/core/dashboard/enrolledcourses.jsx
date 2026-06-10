import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileapi";
import ProgressBarModule from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

function Enrolledcourses() {
  const ProgressBar = ProgressBarModule.default;
  const { token } = useSelector((state) => state.auth);

  const [enrolledcourses, setenrolledcourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getenrolledcourses = async () => {
    try {
      setLoading(true);
      const response = await getUserEnrolledCourses(token);
      console.log("response of setenrolledcourses is ",response);
      setenrolledcourses(response || []);
    } catch (err) {
      console.log("unable to fetch enrolled courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getenrolledcourses();
  }, [token]);
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">
      <div className="text-2xl font-semibold mb-6">Enrolled Courses</div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : !enrolledcourses.length ? (
        <p className="text-gray-400">You have not enrolled in any course yet</p>
      ) : (
        <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg">
          
          {/* Header */}
          <div className="grid grid-cols-4 text-gray-400 text-sm px-6 py-4 border-b border-gray-700">
            <p>Course</p>
            <p>Duration</p>
            <p>Progress</p>
            <p className="text-right">Action</p>
          </div>

          {/* Rows */}
          {enrolledcourses.map((course, index) => (
            <div
                onClick={()=>navigate(
                    `/view-course/${course?._id}/section/${course.coursecontent?.[0]?._id}/sub-section/${course.coursecontent[0]?.subsection[0]?._id}`
                )}
              key={course._id || index}
              className="grid grid-cols-4 items-center px-6 py-4 border-b border-gray-800 hover:bg-[#1a2232] transition"
            >
              {/* Course Info */}
              <div className="flex items-center gap-3">
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{course.coursename}</p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {course.coursedescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-gray-300 text-sm">
                {course?.totalDuration || "N/A"}
              </div>

              {/* Progress */}
              <div className="w-full pr-6">
                <p className="text-xs text-gray-400 mb-1">
                  {Number(course.progressPercentage) || 0}% completed
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#3b82f6"
                  baseBgColor="#1f2937"
                />
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-white">
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Enrolledcourses;