import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { catalogdata } from "../apis";

export const Getcatalogpagedata = async(catagoryid)=>{
    const toastid = toast.loading("loading...");
    let result = [];
    try{
        const response = await apiconnector("POST",catalogdata.CATALOGPAGEDATA_API,{catagoryid:catagoryid});
        if(!response){
            throw new Error("could not fetch catagory page data");
        }
         result = response?.data;
    }catch(error){
        console.log("catagory page data api error");
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastid);
    return result;
}