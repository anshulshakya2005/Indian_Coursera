import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Iconbutton from "../../../../common/iconbutton";
import { resetCourseState, setStep } from "../../../../../slices/courseslice";
import { useEffect } from "react";
import { editCourseDetails } from "../../../../../services/operations/coursedetailesapi";

function Publishcourse() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
useEffect(() => {
  if (course) {
    setValue("public", course.status === "Published");
  }
}, [course, setValue]);
  const gotocourses = ()=>{
    dispatch(resetCourseState());

  }
  const handleCoursepublish = async ()=>{
    if(course?.status === "Published" && getValues("public") === true || (course?.status==="Draft" && getValues("public")===false)){
        gotocourses();
        return;
    }
    const formdata = new FormData();
    formdata.append("courseid",course._id);
    const coursestatus = getValues("public")?"Published":"Draft";
    formdata.append("status",coursestatus);
    setloading(true);
    const result = await editCourseDetails(formdata,token);
    if(result){
        gotocourses();
    }
    setloading(false);
  }
  const onSubmit = () => {
    handleCoursepublish();
  };
  const goback = () => {
    dispatch(setStep(2));
  };
  return (
    <div className="rounded-md border-[1px] bg-[#424854] p-3 border-amber-100">
      <p>publish course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded h-4 w-4"
            ></input>
            <span className="ml-1.5"> make this course as public</span>
          </label>
        </div>
        <div className="flex justify-end gap-x-3 mt-6">
          {/* Back Button */}
          <button
            disabled={loading}
            type="button"
            onClick={goback}
            className="
      rounded-md
      border border-gray-600
      bg-gray-800
      px-5 py-2
      text-sm font-medium text-white
      transition-all duration-200
      hover:bg-gray-700
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
          >
            Back
          </button>

          {/* Save Button */}
          <Iconbutton
          type="submit"
            disabled={loading}
            text={loading ? "Saving..." : "Save Changes"}
            customclasses="
      rounded-md
      bg-yellow-400
      px-5 py-2
      font-semibold
      text-black
      hover:bg-yellow-300
      transition-all duration-200
      disabled:opacity-50
    "
          />
        </div>
      </form>
    </div>
  );
}
export default Publishcourse;
