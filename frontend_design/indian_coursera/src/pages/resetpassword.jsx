import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getpasswordresettoken} from "../services/operations/authapi"
function Resetpassword() {
  const [emailsent, setemailsent] = useState(false);
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const handleonsubmit = (event)=>{
    event.preventDefault();
    dispatch(getpasswordresettoken(email,setemailsent));
  }
  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="text-white flex flex-col justify-center items-center p-6 m-6">
          <div className="text-3xl font-bold">{!emailsent ? "Reset your password" : "Check your email"}</div>
          <p className="w-175">
            {!emailsent
              ? "Have no fear. we'll email you instructions to reset your password. if you don't have access to your email we can try account recovery"
              : `we have sent reset email to your ${email}`}
          </p>
          <form onSubmit={handleonsubmit}>
            {
                !emailsent && (
                    <label>
                        <p>Email address</p>
                        <input
                        type="email"
                        name="email"
                        value={email}
                        className="bg-[#999DAA] rounded-md px-1 py-0.5 border-[#DBDDEA] border"
                        onChange={(e)=>setemail(e.target.value)}
                        placeholder="enter your email address"
                        >
                        </input>
                    </label>
                    
                )
            }
            <br></br>
            <button type="submit"
              className="bg-yellow-400 text-black px-4 py-2 w-full rounded cursor-pointer mt-3.5"
              >
                {
                    !emailsent? "reset password":"resend email"
                }
            </button>
                <div className="text-sm">
                    <Link to="/login">back to login </Link>
                </div>
            
          </form>
                

        </div>
      )}
    </div>
  );
}
export default Resetpassword;
