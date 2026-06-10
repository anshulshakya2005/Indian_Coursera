import { toast } from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../slices/profileslice"
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {


    const toastId = toast.loading("Loading...")
    try {

        console.log("TOKEN:", token);
    for (let [key, value] of formData.entries()) {
  console.log("FORMDATA ENTRY:", key, value);
}
    console.log("API:", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API);
      const response = await apiconnector(
  "PUT",
  settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
  formData,
  {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", 
  }
)
      
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}