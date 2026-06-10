import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import Confirmationmodal from "../../../../common/confirmationmodal";
import Subsectionmodal from "./subsectionmodal";
import { FaPlus } from "react-icons/fa";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/coursedetailesapi";
import { setCourse } from "../../../../../slices/courseslice";
function Nestedvirw({ handlechangeeditsectionname }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addsubsection, setaddsubsection] = useState(null);
  const [editsubsecton, seteditsubsection] = useState(null);
  const [viewsubsection, setviewsubsection] = useState(null);
  const [confirmationmodal, setconfirmationmodal] = useState(null);

  const handledeletesection = async (sectionid) => {
    const result = await deleteSection(
      {
        sectionid,
        courseid: course._id,
      },
      token,
    );
    console.log("result of lokendra", result);
    if (result) {
      dispatch(setCourse(result));
    }
    setconfirmationmodal(null);
  };
  const handledeletesubsection = async (subsectionid, sectionid) => {
    const result = await deleteSubSection({ subsectionid, sectionid }, token);
    console.log("lokendra", result);
    if (result) {
      dispatch(setCourse(result));
    }
    setconfirmationmodal(null);
  };
 return (
  <div className="space-y-4">

    {course?.coursecontent?.map((section) => (
      <details
        key={section._id}
        open
        className="
          overflow-hidden
          rounded-xl
          border
          border-richblack-700
          bg-richblack-800
        "
      >

        {/* Section Header */}
        <summary
          className="
            flex
            cursor-pointer
            items-center
            justify-between
            px-5
            py-4
            hover:bg-richblack-700
          "
        >
          <div className="flex items-center gap-3">

            <RxDropdownMenu className="text-richblack-300" />

            <p className="font-medium text-richblack-5">
              {section.sectionname}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                handlechangeeditsectionname(
                  section._id,
                  section.sectionname
                )
              }
              className="
                rounded-md
                p-2
                text-yellow-50
                hover:bg-richblack-600
              "
            >
              <MdModeEditOutline />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setconfirmationmodal({
                  text1: "Delete this section",
                  text2:
                    "All lectures inside this section will be deleted",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1handler: () =>
                    handledeletesection(section._id),
                  btn2handler: () =>
                    setconfirmationmodal(null),
                });
              }}
              className="
                rounded-md
                p-2
                text-pink-200
                hover:bg-pink-900/20
              "
            >
              <RiDeleteBinFill />
            </button>

            <BiSolidDownArrow
              className="text-richblack-300"
            />

          </div>
        </summary>

        {/* Lecture Area */}
        <div className="space-y-3 border-t border-richblack-700 p-5">

          {section?.subsection?.map((data) => (
            <div
              key={data._id}
              onClick={() => setviewsubsection(data)}
              className="
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-lg
                bg-richblack-700
                px-4
                py-3
                hover:bg-richblack-600
                transition-all
              "
            >

              <div className="flex items-center gap-3">

                <RxDropdownMenu />

                <p className="text-richblack-5">
                  {data.title}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    seteditsubsection({
                      ...data,
                      sectionid: section._id,
                    });
                  }}
                  className="
                    rounded-md
                    p-2
                    hover:bg-richblack-500
                  "
                >
                  <MdModeEditOutline />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setconfirmationmodal({
                      text1:
                        "Delete this lecture",
                      text2:
                        "Current lecture will be removed",
                      btn1Text:
                        "Delete",
                      btn2Text:
                        "Cancel",
                      btn1handler: () =>
                        handledeletesubsection(
                          data._id,
                          section._id
                        ),
                      btn2handler: () =>
                        setconfirmationmodal(
                          null
                        ),
                    });
                  }}
                  className="
                    rounded-md
                    p-2
                    text-pink-200
                    hover:bg-pink-900/20
                  "
                >
                  <RiDeleteBinFill />
                </button>

              </div>

            </div>
          ))}

          {/* Add Lecture */}
          <button
            onClick={() =>
              setaddsubsection(section._id)
            }
            className="
              mt-2
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-yellow-400
              px-4
              py-2
              text-yellow-50
              hover:bg-yellow-400
              hover:text-richblack-900
              transition-all
            "
          >
            <FaPlus />

            Add Lecture
          </button>

        </div>

      </details>
    ))}

    {/* Modals */}
    {addsubsection ? (
      <Subsectionmodal
        modaldata={addsubsection}
        setmodaldata={setaddsubsection}
        add={true}
      />
    ) : viewsubsection ? (
      <Subsectionmodal
        modaldata={viewsubsection}
        setmodaldata={setviewsubsection}
        view={true}
      />
    ) : editsubsecton ? (
      <Subsectionmodal
        modaldata={editsubsecton}
        setmodaldata={seteditsubsection}
        edit={true}
      />
    ) : null}

    {confirmationmodal && (
      <Confirmationmodal
        modaldata={confirmationmodal}
      />
    )}

  </div>
);
}
export default Nestedvirw;
