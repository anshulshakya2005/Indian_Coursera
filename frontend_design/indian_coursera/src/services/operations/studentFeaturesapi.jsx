import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";
import logo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseslice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API} = studentEndpoints
function loadscripts (src){

    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastid = toast.loading("loading...")
    try{
        const res = await loadscripts("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("rozarpay failed to load");
            return;
        }

        const orderresponse= await apiconnector("POST",COURSE_PAYMENT_API,{courses},{Authorization: `Bearer ${token}`});
        if(!orderresponse.data.success){
            throw new Error(orderresponse.data.message);
        }

        //options
        const options={
           "key": import.meta.env.VITE_RAZORPAY_KEY,
            "currency":orderresponse.data.data.currency,
            "amount":`${orderresponse.data.data.amount}`,
            "order_id":orderresponse.data.data.id,//can be error
            "name":"indian coursera",
            "description":"thank you for purchaging the course ",
            "image":logo,
            "handler":function(response){
                //verify payment
                verifypayment({...response,courses},token,navigate,dispatch);
                
            },
            "prefill":{
                name:`${userDetails.firstname}`,
                email:userDetails.email,
            }
        }

        const paymentobject= new window.Razorpay(options);
        paymentobject.open();
        paymentobject.on("payment.failed",function(response){
            toast.error("oops,payment failed");
            console.log(response);
        })
    }catch(err){
        console.log("paynet erorr",err);
        toast.error("could not make payment");
    
    }
    toast.dismiss(toastid)
}

async function verifypayment(bodydata,token,navigate,dispatch){
    const toastid = toast.loading("varifying payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiconnector("POST",COURSE_VERIFY_API,bodydata,{
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("payment successful ,you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(err){
        console.log("payment verify error",err);
        toast.error("could not verify payment");
    }
    toast.dismiss(toastid);
    dispatch(setPaymentLoading(false));
}