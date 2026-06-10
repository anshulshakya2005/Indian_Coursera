import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiconnector } from "../../services/apiconnector";
import {contactendpoints} from "../../services/apis";
import countrycode from "../../data/countrycode.json"
import {toast} from "react-hot-toast"

function Contactusform() {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        contactnumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitcontactform = async (data) => {
    console.log("logging data",data.firstname,data.lastname,data.message,data.contactnumber);
    try{    
        setloading(true);
        const response = await apiconnector("POST",contactendpoints.CONTACT_US_API,data);
        console.log("response of contactus",response);
        setloading(false);
        toast.success("message received");
    }catch(err){
        console.log("error in contact us submission");
        setloading(false);
        toast.error("please try again")
    }
  };
  return (
    <form onSubmit={handleSubmit(submitcontactform)}>
      <div className="text-white flex flex-col gap-6">
        <div className="flex flex-row  gap-5">
          <label htmlFor="firstname">first name</label>
          <input
            className="border border-white"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="enter first name"
            {...register("firstname", { required: true })}
          >
          </input>
            {errors.firstname && <span>please enter your name</span>}
          <label htmlFor="lastname">last name</label>
          <input
          className="border border-white"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="enter last name"
            {...register("lastname")}
          >
          </input>
        </div>

        <div className="flex flex-col">
            <label htmlFor="email">enter your email address </label>
            <input
            className="border border-white"
            type="email"
            name="email"
            id="email"
            placeholder="enter your email"
            {
                ...register("email",{required:true})
            }
            >
            </input>
             {
                    errors.email&&(
                        <span>
                            please enter your email address
                        </span>
                    )
                }
        </div>

        <div className="flex flex-col gap-2">
           <label htmlFor="contactnumber">phone no.</label>
     <div className="flex flex-row gap-2">
  
  {/* dropdown */}
  <div className="w-[140px]">
    <select
      className="w-full "
      {...register("countrycode", { required: true })}
    >
      {countrycode.map((element, idx) => (
        <option  key={idx} value={element.code}>
          {element.code}-{element.country}
        </option>
      ))}
    </select>
  </div>

  {/* input */}
  <div className="flex-1">
    <input
    
      type="tel"
      className="w-full border border-white"
      placeholder="12345-67890"
      {...register("contactnumber", {
        required: "please enter phone number",
      })}
    />
  </div>

</div>
        </div>
        <div className="flex flex-col">
                <label htmlFor="message">enter message</label>
                <textarea
                className="border border-white"
                name="message"
                id="message"
                cols={20}
                rows={5}
                placeholder="enter your message here"
                {
                    ...register("message",{required:true})
                }
                >
                </textarea>
                    {
                        errors.message&&(<span>enter your message</span>)
                    }
        </div>
        <button type="submit" className="bg-yellow-400 rounded-md font-bold  text-lg px-4 py-1 mb-5 text-black">
                    send message
        </button>
      </div>
    </form>
  );
}
export default Contactusform;
