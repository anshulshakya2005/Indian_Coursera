import { useDispatch } from "react-redux"
import {setUser} from "../../slices/profileslice"
import { apiconnector } from "../apiconnector";

import toast from "react-hot-toast";
import {profileendpoints} from "../apis"
const fetchprofile = async (dispatch)=>{
    console.log("🔥 fetchprofile STARTED");
   
    try{
        const token = localStorage.getItem("token");
        console.log("🔑 TOKEN:", token);
        const response = await  apiconnector("GET",profileendpoints.PROFILE_API,null,{
            
    Authorization: `Bearer ${token}`,
  
        })
        console.log("✅ API RESPONSE:", response);

        dispatch(setUser(response.data.data));
    }catch(err){
        console.log(err);
         console.log("❌ ERROR:", err.response?.data || err);
    }
}
export default fetchprofile;



export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
   const {GET_USER_ENROLLED_COURSES_API} = profileendpoints;
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiconnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getinstructordata(token) {
  const toastid = toast.loading("loading...");
  let result = [];

  try {
    const { GET_INSTRUCTOR_DATA_WITH_STATS_API } = profileendpoints;

    const response = await apiconnector(
      "GET",
      GET_INSTRUCTOR_DATA_WITH_STATS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("get instructor data api response is", response);
    result = response?.data?.courses;
  } catch (err) {
    console.log("get instructor data api error", err);
    toast.error("could not get instructor data");
  }

  toast.dismiss(toastid);
  return result;
}
