import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/coursedetailesapi";
import { setCourse } from "../../../../../slices/courseslice";
import { ImCross } from "react-icons/im";
import Upload from "../Courseinformation/upload";
import Iconbutton from "../../../../common/iconbutton";

function Subsectionmodal({
    modaldata,setmodaldata,add=false,view=false,edit=false
}){
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    }= useForm();
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {course}= useSelector((state)=>state.course);

    useEffect(()=>{
        if(view||edit){
            setValue("lecturetitle",modaldata.title);
            setValue("lecturedisc",modaldata.description);
            setValue("videofile",modaldata.videourl);
            setValue("timeduration",modal.timeduration);
        }
    },[]);
    const isformupdated=()=>{
        const currentvalues = getValues();
        if(currentvalues.lecturetitle!==modaldata.title||currentvalues.lecturedisc!==modaldata.description||currentvalues.videofile!==modaldata.videourl||currentvalues.timeduration!==modaldata.timeduration){
            return true;
        }
        else{
            return false;
        }
    }
    const handleeditsubsection= async ()=>{
        const currentvalues = getValues();
        const formdata = new FormData();
        formdata.append("sectionid",modaldata.sectionid);
        formdata.append("subsectionid",modaldata._id);
        if(currentvalues.lecturetitle!==modaldata.title){
            formdata.append("title",currentvalues.lecturetitle);
        }
        if(currentvalues.lecturedisc!==modaldata.description){
            formdata.append("description",currentvalues.lecturedisc);
        }
        if(currentvalues.videofile!==modaldata.videourl){
            formdata.append("videofile",currentvalues.videofile);
        }
        if(currentvalues.timeduration!==modaldata.timeduration){
          formdata.append("timeduration",currentvalues.timeduration);
        }
        setloading(true);
        const result = await updateSubSection(formdata,token);
        if(result){
            dispatch(setCourse(result));
        }
        setmodaldata(null);
        setloading(false);
    }
    const onSubmit = async (data)=>{
        if(view){
            return;
        }
        if(edit){
            if(!isformupdated()){
                toast.error("no changes are made to the form .")
            }
            else{
               await handleeditsubsection();
                return;
            }
        }
        console.log("modaldata",modaldata)
        const formdata = new FormData();
        formdata.append("sectionid",modaldata);
        formdata.append("title",data.lecturetitle);
        formdata.append("description",data.lecturedisc);
        formdata.append("videofile",data.videofile);
        formdata.append("timeduration", data.timeduration || 0);

        setloading(true);
        const result = await createSubSection(formdata,token);
        if(result){
            dispatch(setCourse(result));
             setmodaldata(null);
        }
       
        setloading(false);
    }
   return (
  <div
    className="
      fixed inset-0 z-[1000]
      flex items-center justify-center
      bg-black/50
      backdrop-blur-sm
      p-4
    "
  >
    <div
      className="
        w-full
        max-w-3xl
        rounded-2xl
        border
        border-richblack-700
        bg-richblack-800
        shadow-2xl
        max-h-[90vh]
        overflow-y-auto
      "
    >

      {/* Header */}
      <div
        className="
          flex items-center justify-between
          border-b border-richblack-700
          px-6 py-5
        "
      >
        <h2 className="text-xl font-semibold text-richblack-5">

          {view && "View Lecture"}

          {add && "Add Lecture"}

          {edit && "Edit Lecture"}

        </h2>

        <button
          onClick={() => (!loading ? setmodaldata(null) : {})}
          className="
            rounded-full
            p-2
            text-richblack-200
            hover:bg-richblack-700
            transition-all
          "
        >
          <ImCross size={14} />
        </button>
      </div>

      {/* Body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6"
      >

        {/* Upload */}
        <Upload
          name="videofile"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modaldata.videourl : null}
          editData={edit ? modaldata.videourl : null}
        />

        {/* Title */}
        <div>
           <label className="mb-2 block text-sm text-richblack-5">
            Lecture timeduration
          </label>
          <input
          id="timeduration"
          disabled={view}
          placeholder="enter time duration"
          {...register("timeduration",{required:true})}
            className="
              w-full
              rounded-lg
              border
              border-richblack-600
              bg-richblack-700
              px-4
              py-3
              text-richblack-5
              outline-none
              focus:border-yellow-400
            "
          >
          </input>
           {errors.timeduration && (
            <span className="text-sm text-pink-300">
              timeduration required
            </span>
          )}
          <label className="mb-2 block text-sm text-richblack-5">
            Lecture Title
          </label>

          <input
            id="lecturetitle"
            disabled={view}
            placeholder="Enter lecture title"
            {...register("lecturetitle", {
              required: true,
            })}
            className="
              w-full
              rounded-lg
              border
              border-richblack-600
              bg-richblack-700
              px-4
              py-3
              text-richblack-5
              outline-none
              focus:border-yellow-400
            "
          />

          {errors.lecturetitle && (
            <span className="text-sm text-pink-300">
              Lecture title required
            </span>
          )}

        </div>

        {/* Description */}
        <div>

          <label className="mb-2 block text-sm text-richblack-5">
            Lecture Description
          </label>

          <textarea
            id="lecturedisc"
            disabled={view}
            placeholder="Enter lecture description"
            {...register("lecturedisc", {
              required: true,
            })}
            className="
              min-h-[160px]
              w-full
              rounded-lg
              border
              border-richblack-600
              bg-richblack-700
              px-4
              py-3
              text-richblack-5
              outline-none
              focus:border-yellow-400
            "
          />

          {errors.lecturedisc && (
            <span className="text-sm text-pink-300">
              Lecture description required
            </span>
          )}

        </div>

        {/* Footer */}
        {!view && (
          <div className="flex justify-end">

            <Iconbutton
              type="submit"
              text={
                loading
                  ? "Loading..."
                  : edit
                  ? "Save Changes"
                  : "Save Lecture"
              }
              customclasses="
                rounded-lg
                bg-yellow-400
                px-6
                py-3
                font-semibold
                text-richblack-900
                hover:bg-yellow-300
                transition-all
              "
            />

          </div>
        )}

      </form>

    </div>
  </div>
);
}
export default Subsectionmodal