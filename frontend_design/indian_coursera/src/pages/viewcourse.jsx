import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/coursedetailesapi";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import Videodetailsandsidebar from "../components/core/viewcourse/Videodetailsandsidebar";
import VideoDetails from "../components/core/viewcourse/VideoDetails";
import Coursereviewmodal from "../components/core/viewcourse/Coursereviewmodal";
function ViewCourse() {
  const [reviewmodal, setreviewmodal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const setcoursespecificdetails = async () => {
      const coursedata = await getFullDetailsOfCourse(courseId, token);

      console.log("API RESPONSE:", coursedata);

      const course = coursedata?.coursedetails;

      if (!course) {
        console.error("Course not found in API response", coursedata);
        return;
      }

      dispatch(setCourseSectionData(course?.coursecontent));
      dispatch(setEntireCourseData(course));
      dispatch(setCompletedLectures(coursedata?.completedvideos));

      let lectures = 0;

      course?.coursecontent?.forEach((sec) => {
        lectures += sec?.subsection?.length || 0;
      });

      dispatch(setTotalNoOfLectures(lectures));
    };

    setcoursespecificdetails();
  }, [courseId, token, dispatch]);
  console.log("reviewmodal:", reviewmodal);
  return (
    <>
      <div className="flex">
        <Videodetailsandsidebar setreviewmodal={setreviewmodal} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      {reviewmodal && <Coursereviewmodal setreviewmodal={setreviewmodal} />}
    </>
  );
}
export default ViewCourse;
