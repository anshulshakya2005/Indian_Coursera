import { useForm } from "react-hook-form";
import Iconbutton from "../../../../common/iconbutton";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseslice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/coursedetailesapi";
import Nestedvirw from "./nestedcomp";

function CourseBuilderform() {
    const dispatch = useDispatch();
 const{course} = useSelector((state)=>state.course);
 function gotoback(){
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
 }
 function gotonext(){
    console.log(course);
console.log(course.coursecontent);
    if(course?.coursecontent?.length===0){
        toast.error("please add atleast one section");
        return ;
    }
    if(course.coursecontent.some((section)=>section.subsection.length===0)){
        toast.error("please add atleast lecture in each section");
        return;
    }
    dispatch(setStep(3));
 }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editsectionname,seteditsectionname] = useState(null);
      const canceledit=()=>{
        seteditsectionname(null);
        setValue("sectionname","");
    }
    const [loading,setloading] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    const onSubmit=async (data)=>{
        setloading(true);
        let result;
        if(editsectionname){
            result = await updateSection({sectionname:data.sectionname,
                sectionid:editsectionname,
                courseid:course._id,
            },token)
        }
        else{
            result = await createSection({
                sectionname:data.sectionname,
                courseid:course._id,
            },token)
        }
         console.log("here is the result of my and lokendra's love ",result);
            
        if(result){
           dispatch(setCourse(result));
            seteditsectionname(null);
            setValue("sectionname","");
        }
        setloading(false);
    }
    const handlechangeeditsectionname =(sectionid,sectionname)=>{
        if(editsectionname===sectionid){
            canceledit();
            return;
        }
        seteditsectionname(sectionid);
        setValue("sectionname",sectionname);

    }
return (
  <div className="mt-8 rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg">

    {/* Heading */}
    <p className="mb-8 text-3xl font-semibold text-richblack-5">
      Course Builder
    </p>

    {/* Form */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Input */}
      <div>
        <label
          htmlFor="sectionname"
          className="mb-2 block text-sm font-medium text-richblack-5"
        >
          Section Name <span className="text-pink-300">*</span>
        </label>

        <input
          id="sectionname"
          placeholder="Add a section name"
          {...register("sectionname", { required: true })}
          className="
            w-full rounded-lg
            border border-richblack-600
            bg-richblack-700
            px-4 py-3
            text-richblack-5
            outline-none
            transition-all
            duration-200
            focus:border-yellow-400
            focus:ring-2
            focus:ring-yellow-400
          "
        />

        {errors.sectionname && (
          <span className="mt-2 block text-sm text-pink-300">
            Section name is required
          </span>
        )}
      </div>

      {/* Create Button */}
      <div className="flex items-center gap-4">
        <Iconbutton
          type="submit"
          text={
            editsectionname
              ? "Update Section"
              : "Create Section"
          }
          outline={true}
          customclasses="
            flex items-center
            gap-2
            rounded-lg
            bg-yellow-400
            px-5
            py-3
            font-medium
            text-richblack-900
            hover:scale-[1.02]
            hover:bg-yellow-300
            transition-all
            duration-200
          "
        >
          <IoIosAddCircleOutline className="text-xl" />
        </Iconbutton>

        {editsectionname && (
          <button
            type="button"
            onClick={canceledit}
            className="
              text-sm
              text-yellow-50
              underline
              hover:text-yellow-300
            "
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {/* Sections */}
    {course?.coursecontent?.length > 0 && (
      <div className="mt-8 rounded-lg border border-richblack-700 p-5">
        <Nestedvirw
          handlechangeeditsectionname={
            handlechangeeditsectionname
          }
        />
      </div>
    )}

    {/* Navigation */}
    <div className="mt-10 flex justify-end gap-4">

      <button
        onClick={gotoback}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-richblack-600
          px-5
          py-3
          text-richblack-100
          hover:bg-richblack-700
          transition-all
        "
      >
        <IoIosArrowDropleft className="text-xl" />
        Back
      </button>

      <Iconbutton
        text="Next"
        onClick={gotonext}
        customclasses="
          flex
          items-center
          gap-2
          rounded-lg
          bg-yellow-400
          px-5
          py-3
          font-semibold
          text-richblack-900
          hover:bg-yellow-300
          transition-all
        "
      >
        <IoIosArrowDropright className="text-xl" />
      </Iconbutton>

    </div>
  </div>
);
}
export default CourseBuilderform;
