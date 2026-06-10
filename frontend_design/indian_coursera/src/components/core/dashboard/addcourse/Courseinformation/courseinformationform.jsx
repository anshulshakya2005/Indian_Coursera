import { useEffect } from "react";
import { useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/coursedetailesapi";
import Requirementfield from "./requirement";
import { setCourse, setStep } from "../../../../../slices/courseslice";
import Iconbutton from "../../../../common/iconbutton";
import toast from "react-hot-toast";
import Upload from "./upload";
import ChipInput from "./chipinput";
function CourseInformationform(){
const {
 register,
 handleSubmit,
 setValue,
 getValues,
 formState:{ errors }
} = useForm();

const dispatch = useDispatch();
const {token} = useSelector((state)=>state.auth);
console.log("TOKEN:   ", token)
const {course,editCourse}  = useSelector((state)=>state.course);
const [loading,setloading] = useState(false);
const [coursecatagories,setcoursecatagories] = useState([]);
useEffect(()=>{
    const getcatagories = async()=>{
        setloading(true);
        const catagories = await fetchCourseCategories();
        if(catagories?.length>0){
            console.log(catagories)
            setcoursecatagories(catagories);
        }
        setloading(false);
    }
    if(editCourse){
        setValue("coursetitle",course.coursename);
        setValue("courseShortdisc",course.coursedescription);
        setValue("courseprice",course.price);
        setValue("coursetags",course.tag);
        setValue("coursebenefits",course.whatyouwilllearn);
        setValue("coursecatagories",course.catagory);
        setValue("courserequirement",course.instructions);
        setValue("courseimage",course.thumbnail);
    }
    getcatagories();
},[]) 

const isformupdated = ()=>{
    const currentvalues = getValues();
    if(currentvalues.coursetitle!==course.coursename||
        currentvalues.courseShortdisc!==course.coursedescription||
        currentvalues.courseprice!==course.price||
        currentvalues.coursebenefits!==course.whatyouwilllearn||
        currentvalues.courserequirement.toString()!==course.instructions.toString()||
        currentvalues.coursecatagories._id!==course.catagory._id||
        currentvalues.courseimage!==course.thumbnail||
        currentvalues.coursetags!==course.tag
    ){
        return true;
    }
    else{
        return false;
    }
}
//handles next button click
const onSubmit = async(data)=>{
    if(editCourse){
       if(isformupdated()){
         const currentvalues = getValues();
        const formdata = new FormData();
        formdata.append("courseid",course._id);
        if(currentvalues.coursetitle!==course.coursename){
            formdata.append("coursename",data.coursetitle);
        }
        if(currentvalues.courseShortdisc!==course.coursedescription){
            formdata.append("coursedescription",data.courseShortdisc);
        }
        if(currentvalues.coursebenefits!==course.whatyouwilllearn){
            formdata.append("whatyouwilllearn",data.coursebenefits);
        }
        if(currentvalues.coursecatagories._id!==course.catagory._id){
            formdata.append("catagory",data.coursecatagories);
        }
        if(currentvalues.courserequirement.toString()!==course.instructions.toString()){
            formdata.append("instructions",JSON.stringify(data.courserequirement));
        }
        if(currentvalues.coursetags!==course.tag){
            formdata.append("tag",data.coursetags);
        }
        if(currentvalues.courseimage !== course.thumbnail){
           formdata.append("thumbnailImage", data.courseimage);
        }

        setloading(true);
        const result = await editCourseDetails(formdata,token);
        setloading(false);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
       }
       else{
        toast.error("no changes done");
       }
       return;
    }
    //create a new course
    const formdata = new FormData();
    formdata.append("coursename",data.coursetitle);
    formdata.append("coursedescription",data.courseShortdisc);

    formdata.append("price",data.courseprice);

    formdata.append("whatyouwilllearn",data.coursebenefits);

    formdata.append("catagory",data.coursecatagories);
formdata.append("instructions",JSON.stringify(data.courserequirement));
formdata.append("status","draft");
formdata.append("thumbnailImage", data.courseimage);
formdata.append("tag",data.coursetags)
console.log(data);
console.log(data.courseimage);
setloading(true);
const result = await addCourseDetails(formdata,token);
if(result){
   dispatch(setStep(2));
    dispatch(setCourse(result));
}
setloading(false);

   
}
    return (
       <form
       onSubmit={handleSubmit(onSubmit)}
       className="rounded-md border-black bg-[#161D29] p-6 space-y-8"
       >
        <div>
            <label>
                course title <sup>*</sup>
            </label>
            <input
            id='coursetitle'
            placeholder="enter course title here"
            {...register("coursetitle",{required:true})}
            className="w-full"
            ></input>
            {errors.coursetitle && (
                <span>
                    course title is required
                </span>
            )}
        </div>

        <div>
            <label>
                course short discription*
            </label>
            <textarea
            id="courseShortdisc"
            placeholder="enter descriptions"
            {...register("courseShortdisc",{required:true})}
            className="min-h-35 w-full"
            ></textarea>
            {errors.courseShortdisc&&(<span>course description is required </span>)}
        </div>

        <div className="relative">
            <label>
                course price <sup>*</sup>
            </label>
            <input
            id='courseprice'
            placeholder="enter course price here"
            {...register("courseprice",{required:true,
                valueAsNumber:true,
            })}
            className="w-full"
            ></input>
            <HiOutlineCurrencyRupee className="absolute top-[25px]" />
            {errors.courseprice && (
                <span>
                    course price is required
                </span>
            )}
        </div>
        <div>
            <label>
                course catagory*
            </label>
            <select
            id='coursecatagories'
            defaultValue=""
            {...register("coursecatagories",{required:true})}
            >
                <option value="" disabled>choose catagory</option>
                {
                    !loading && coursecatagories.map((catagories,index)=>(
                        <option key={index} value={catagories?._id}>{catagories?.name}</option>
                    ))
                }
            </select>
            {errors.coursecatagories&&(
                <span>course catagories are required</span>
            )}
        </div>

             <ChipInput
            label="Tags"
            name="coursetags"
            placeholder="Enter Tags and Press Enter"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
        />

         <Upload 
        name="courseimage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
        />

        <div>
            <label>
                benefits of the course*
            </label>
            <textarea
            id="coursebenefits"
            placeholder="enter the benefites of the course"
            {...register("coursebenefits",{required:true})}
             className="min-h-35 w-full"
            ></textarea>
            {errors.coursebenefits&&(<span>benefits are required to be filled</span>)}
        </div>


        <Requirementfield
        name="courserequirement"
        label="requirement/instruction"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

        <div>
            {
                editCourse&&(
                    <button
                    onClick={()=>dispatch(setStep(2))}
                    className="flex items-center gap-x-2 bg-[#838894]"
                    >
                        continue without saving
                    </button>
                )
            }

          <button
  type="submit"
  className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 active:scale-95 transition-all duration-150 shadow-md"
>
  {!editCourse ? "Next" : "Save Changes"}
</button>
           
        </div>
       </form>
       
    )
}
export default CourseInformationform