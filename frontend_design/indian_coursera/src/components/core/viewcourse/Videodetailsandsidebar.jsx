import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Iconbutton from "../../common/iconbutton";
import Enrolledcourses from "../dashboard/enrolledcourses";

function Videodetailsandsidebar({ setreviewmodal }) {
  const [activestatus, setactivestatus] = useState("");
  const [videobaractive, setvideobaractive] = useState("");

  const { sectionId, subsectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  console.log("course entire data", courseEntireData);
  useEffect(() => {
    if (!courseSectionData?.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId,
    );

    if (currentSectionIndex === -1) {
      setactivestatus("");
      setvideobaractive("");
      return;
    }

    const subsections =
      courseSectionData[currentSectionIndex]?.subsection || [];

    const currentSubIndex = subsections.findIndex(
      (sub) => sub._id === subsectionId,
    );

    if (currentSubIndex === -1) {
      setactivestatus(courseSectionData[currentSectionIndex]._id);
      setvideobaractive("");
      return;
    }

    setactivestatus(courseSectionData[currentSectionIndex]._id);
    setvideobaractive(subsections[currentSubIndex]._id);
  }, [courseSectionData, sectionId, subsectionId]);
  const navigate = useNavigate();
return (
  <div className="h-[calc(100vh-3.5rem)] w-[320px] bg-gray-900 text-white flex flex-col border-r border-gray-700">

    {/* TOP HEADER */}
    <div className="p-4 border-b border-gray-700 flex flex-col gap-2">

      <button
        onClick={() => navigate("/dashboard/enrolledcourses")}
        className="text-sm text-gray-300 hover:text-yellow-400 transition-all text-left"
      >
        ← Back to courses
      </button>

      <p className="text-md font-semibold text-yellow-400 line-clamp-2">
        {courseEntireData?.coursename || "Loading..."}
      </p>

      <p className="text-xs text-gray-400">
        {completedLectures?.length}/{totalNoOfLectures} completed
      </p>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400"
          style={{
            width: `${
              totalNoOfLectures
                ? (completedLectures?.length / totalNoOfLectures) * 100
                : 0
            }%`,
          }}
        />
      </div>

      <button
        onClick={() => setreviewmodal(true)}
        className="mt-2 text-sm bg-yellow-400 text-black py-1 rounded-md hover:bg-yellow-300 transition-all"
      >
        Add Review
      </button>
    </div>

    {/* SCROLLABLE CONTENT */}
    <div className="flex-1 overflow-y-auto p-2 space-y-2">

      {courseSectionData.map((course) => (
        <div
          key={course._id}
          className="bg-gray-800 rounded-md overflow-hidden border border-gray-700"
        >

          {/* SECTION HEADER */}
          <div
            className="px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-700 transition-all"
            onClick={() => setactivestatus(course?._id)}
          >
            <p className="text-sm font-medium text-gray-200">
              {course?.sectionname}
            </p>
          </div>

          {/* SUBSECTION LIST */}
          {activestatus === course?._id && (
            <div className="flex flex-col">

              {(course?.subsection || []).map((topic) => (
                <div
                  key={topic._id}
                  onClick={() => {
                    navigate(
                      `view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                    );
                    setvideobaractive(topic?._id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer transition-all border-l-2 ${
                    videobaractive === topic._id
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "border-transparent hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completedLectures?.includes(topic?._id)}
                    onChange={() => {}}
                    className="accent-yellow-400"
                  />

                  <span className="line-clamp-1">{topic.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}

export default Videodetailsandsidebar;
