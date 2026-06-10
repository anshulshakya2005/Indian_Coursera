import {toast} from "react-hot-toast";
import {setloading, setToken} from "../../slices/authslice"
import { apiconnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { resetCart } from "../../slices/cartslice";
import { setUser } from "../../slices/profileslice";
export function getpasswordresettoken(email,setemailsent){
    return async(dispatch)=>{
        dispatch(setloading(true));
        try{
            const response = await apiconnector("POST",authEndpoints.RESETPASSWORD_API,{email});
            console.log("reset password token response",response);

            if(!response.data.success){
                toast.error("error occured");
                throw new Error(response.data.message);
                
            }
            toast.success("reset email sent");
            setemailsent(true);
        }catch(err){
            console.log("reset password token error");
            toast.error("failed to sent email for resetting password");

        }

        dispatch(setloading(false));
    }
}

export function resetpassword(password ,confirmpassword,token){
    return async(dispatch)=>{
        dispatch(setloading(true));
        try{
            const response = await apiconnector("POST",authEndpoints.CHANGEPASSWORD_API,{password,confirmpassword,token});
            console.log("resetpassowrd res",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("password has been successfully resetted");
        }catch(err){
            console.log("reset password token error ",err);
            toast.error("failed to reset password");
        }
        dispatch(setloading(false));
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged OUT");
        navigate("/");
    }
}