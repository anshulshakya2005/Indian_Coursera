import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/coursedetailesapi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import 'video-react/dist/video-react.css'; // import css
import React from 'react';
import { Player } from 'video-react';
function VideoDetails() {
  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const playerref = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const [videodata, setvideodata] = useState([]);
  const [videoended, setvideoended] = useState(false);
  const [loading, setloading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const setvideospecificdata = async () => {
      if (!courseSectionData) {
        return;
      }
      if (!courseId && !sectionId && !subsectionId) {
        navigate("/dashboard/enrolledcourses");
      } else {
        const filtereddata = courseSectionData.filter(
          (course) => course._id === sectionId,
        );
        const filtervideodata = filtereddata?.[0].subsection.filter(
          (data) => data._id === subsectionId,
        );
        setvideodata(filtervideodata);
        setvideoended(false);
      }
    };
    setvideospecificdata();
  }, [courseSectionData, courseEntireData, location.pathname]);
  const isfirstvideo = () => {
  if (!courseSectionData || courseSectionData.length === 0) return true;

  const currentsectionindex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentsectionindex === -1) return true;

  const subsection =
    courseSectionData[currentsectionindex]?.subsection || [];

  const subsectionindex = subsection.findIndex(
    (data) => data._id === subsectionId
  );

  return currentsectionindex === 0 && subsectionindex === 0;
};

  const restartVideo = () => {
  if (playerref?.current) {
    playerref.current.seek(0);
    setvideoended(false);
  }
};
 const islastvideo = () => {
  if (!courseSectionData || courseSectionData.length === 0) return true;

  const currentsectionindex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentsectionindex === -1) return true;

  const currentsection = courseSectionData[currentsectionindex];

  const subsections = currentsection?.subsection || [];

  const subsectionindex = subsections.findIndex(
    (data) => data._id === subsectionId
  );

  return (
    currentsectionindex === courseSectionData.length - 1 &&
    subsectionindex === subsections.length - 1
  );
};
const gotonextvideo = () => {
  if (!courseSectionData || courseSectionData.length === 0) return;

  const currentsectionindex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentsectionindex === -1) return;

  const currentsection = courseSectionData[currentsectionindex];
  const subsections = currentsection?.subsection || [];

  const subsectionindex = subsections.findIndex(
    (data) => data._id === subsectionId
  );

  // next in same section
  if (subsectionindex < subsections.length - 1) {
    const nextid = subsections[subsectionindex + 1]._id;

    navigate(
      `/view-course/${courseId}/section/${sectionId}/sub-section/${nextid}`
    );
    return;
  }

  // next section
  if (currentsectionindex < courseSectionData.length - 1) {
    const nextsection = courseSectionData[currentsectionindex + 1];

    const nextid = nextsection.subsection?.[0]?._id;

    navigate(
      `/view-course/${courseId}/section/${nextsection._id}/sub-section/${nextid}`
    );
  }
};

const gotoprevvideo = () => {
  if (!courseSectionData || courseSectionData.length === 0) return;

  const currentsectionindex = courseSectionData.findIndex(
    (data) => data._id === sectionId
  );

  if (currentsectionindex === -1) return;

  const currentsection = courseSectionData[currentsectionindex];
  const subsections = currentsection?.subsection || [];

  const subsectionindex = subsections.findIndex(
    (data) => data._id === subsectionId
  );

  // prev in same section
  if (subsectionindex > 0) {
    const previd = subsections[subsectionindex - 1]._id;

    navigate(
      `/view-course/${courseId}/section/${sectionId}/sub-section/${previd}`
    );
    return;
  }

  // prev section
  if (currentsectionindex > 0) {
    const prevsection = courseSectionData[currentsectionindex - 1];
    const prevsubsections = prevsection.subsection || [];

    const previd =
      prevsubsections[prevsubsections.length - 1]?._id;

    navigate(
      `/view-course/${courseId}/section/${prevsection._id}/sub-section/${previd}`
    );
  }
};

  const handlecompletion = async () => {
    setloading(true);

    const work = await markLectureAsComplete({courseId:courseId,subsectionId:subsectionId},token);
    if(work){
        dispatch(updateCompletedLectures(subsectionId));
    }
    setloading(false);

  };
 console.log("videodata is ",videodata);
  return (<div>
    {
        videodata.length === 0?(<div>no data found</div>):(
<Player
  ref={playerref}
  src={videodata?.[0]?.videourl}
onEnded={() => {
  setvideoended(true);
 
}}
/>
        )
    }
    {videoended && (
  <div className="flex gap-3 mt-4">
    
    {/* PREV */}
    {!isfirstvideo() && (
      <button
        onClick={gotoprevvideo}
        className="px-4 py-2 bg-gray-700 rounded"
      >
        ⏮ Previous
      </button>
    )}

    {/* RESTART */}
    <button
      onClick={restartVideo}
      className="px-4 py-2 bg-yellow-600 rounded"
    >
      🔁 Restart
    </button>
    <button className="px-4 py-2 bg-yellow-600 rounded" onClick={handlecompletion}>Mark as complete</button>

    {/* NEXT */}
    {!islastvideo() && (
      <button
        onClick={gotonextvideo}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        ⏭ Next
      </button>
    )}

  </div>
)}
  </div>);
}
export default VideoDetails;
