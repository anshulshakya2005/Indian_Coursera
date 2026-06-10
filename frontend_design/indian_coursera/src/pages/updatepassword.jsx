import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { resetpassword } from "../services/operations/authapi";
function Updatepassword(){
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state)=>state.auth);
    const [showpassword,setshowpassword] =useState(false);
    const [showconfirmpassword,setshowconfirmpassword] =useState(false);
    const [formdata,setformdata] =useState({
        password:"",
        confirmpassword:"",
    })
    const handleonchange= (e)=>{
        setformdata((prev)=>({
            ...prev,[e.target.name] : e.target.value
        }))
    }
    const {password,confirmpassword} = formdata;
    const handleonsubmit=(e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetpassword(password,confirmpassword,token));
    }
    return (
        <div>
            {
                loading?(<div>
                    loading...
                </div>):(
                    <div>
                       <div className="text-white text-3xl flex items-center justify-center mt-5">
                        choose new password
                       </div>
                       <p className="text-white flex items-center justify-center">almost done . enter your new password and your all set.</p>
                       <form onSubmit={handleonsubmit} className="text-white flex items-center justify-center flex-col p-6">
                            <label>
                                <p>new password<span>*</span></p>
                                <input 
                                className="border border-white"
                                required
                                type={showpassword?"text":"password"}
                                name="password"
                                value={password}
                                onChange={handleonchange}
                                ></input>
                                <span
                                onClick={()=>setshowpassword((prev)=>!prev)}
                                >
                                    {
                                        !showpassword?<FaRegEyeSlash />:<FaRegEye />
                                    }
                                </span>
                            </label>
                            <label>
                                <p>confirm new password<span>*</span></p>
                                <input 
                                className="border border-white"
                                required
                                type={showconfirmpassword?"text":"password"}
                                name="confirmpassword"
                                value={confirmpassword}
                                onChange={handleonchange}
                                ></input>
                                <span
                                onClick={()=>setshowconfirmpassword((prev)=>!prev)}
                                >
                                    {
                                        !showconfirmpassword?<FaRegEyeSlash />:<FaRegEye />
                                    }
                                </span>
                            </label>
                            <button
                            type="submit"
                            className="bg-yellow-400 text-black px-4 mt-4 py-1 w-fit rounded cursor-pointer"
                            >
                                reset password
                            </button>
                             <div
                     className="bg-yellow-400 text-black px-4 mt-4 py-1 w-fit rounded cursor-pointer"
                    >
                        <Link to="/login">login</Link>
                    </div>
                       </form>

                   
                    </div>
                )
            }
        </div>
    )
}
export default Updatepassword;