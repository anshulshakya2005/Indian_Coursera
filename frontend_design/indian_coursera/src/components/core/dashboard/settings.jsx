import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { profileendpoints } from "../../../services/apis";
import { apiconnector } from "../../../services/apiconnector";
import { useDispatch, useSelector } from "react-redux";
import Iconbutton from "../../common/iconbutton";
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from "../../../services/operations/settingimage";

function Settings() {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.profile);
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
     const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
   const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }
  const handleClick = () => {
    fileInputRef.current.click()
  }

  const [data, setdata] = useState({
    dateofbirth: "",
    about: "",
    contactnumber: "",
    gender: "",
  });

  const [imgupload,setimgupload] = useState("");

   const handleFileUpload = async () => {
  try {
    console.log("IMAGE FILE:", imageFile);   // 🔍 debug

    if (!imageFile) {
      toast.error("Please select an image first");
      return;
    }

    console.log("uploading...");
    setLoading(true);

    const formData = new FormData();
    formData.append("displayPicture", imageFile);

    await dispatch(updateDisplayPicture(token, formData));

    setLoading(false);
  } catch (error) {
    console.log("ERROR MESSAGE - ", error.message);
    setLoading(false);
  }
};
  function changehandler(event) {
    setdata((prevdata) => {
      const { name, type, checked, value } = event.target; //derefferancing event.target kya h ->jis bhi element par click kiya h vo hai ye
      return {
        ...prevdata,
        // [event.target.name]: event.target.value,//if you do derefferencing then we can write [name]:value
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  async function submithandler(event) {
    event.preventDefault();

    try {
      console.log("Sending data:", data);
      const payload = {
        dateofbirth: data.dateofbirth,
        gender: data.gender,
        contactnumber: data.contactnumber,
        about: data.about,
      };
      const response = await apiconnector(
        "PUT",
        profileendpoints.PROFILE_UPDATE_API,
        payload,
        {
          Authorization: `Bearer ${token}`,
        },
      );
      toast.success("prfile details updated");
      console.log("updated profile details", response.data);
    } catch (error) {
      console.log("profile details not updated", error);
      toast.error("try after sometime.");
    }
  }

  console.log(data);
  return (
    <div>
      <div className="flex w-[800px]">
        <div className="w-[30%]">
          <img className="w-[100px] h-[100px] rounded-full p-3" src={previewSource || user?.image}></img>
        </div>
        <div className="text-white p-3 ml-[-10%]">
          <div>Change Profile Picture</div>
           <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
          <div className="flex gap-3 mt-2">
            <div><button
             onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-richblack-50"
            >select</button></div>
            <div> <Iconbutton
            type="button"
             text={loading ? "Uploading..." : "Upload"}
                onClick={handleFileUpload}
                customclasses="bg-yellow-400 p-2 flex gap-2 rounded-lg text-black font-bold"
            >
               {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </Iconbutton> </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-6 w-225 items-center mx-auto">
        <div>
          <form className="text-white p-2.5" onSubmit={submithandler}>
            <div className="flex gap-3 ">
              <div className="flex flex-col">
                <label htmlFor="dateofbirth">
                  dateofbirth <span className="text-red-500">*</span>
                </label>
                <input
                  className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  onChange={changehandler}
                  name="dateofbirth"
                  value={data.dateofbirth}
                ></input>
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">
                  gender <span className="text-red-500">*</span>
                </label>
                <input
                  className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                  type="text"
                  placeholder="gender"
                  onChange={changehandler}
                  name="gender"
                  value={data.gender}
                ></input>
              </div>
            </div>
            <br />
            <div className="flex flex-col ">
              <label htmlFor="about">
                about <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 focus:border-blue-500 outline-none p-1 rounded-2xl"
                type="text"
                name="about"
                placeholder="enter something about you here "
                onChange={changehandler}
                value={data.about}
              ></input>
            </div>
            <br></br>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                contactnumber <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                <select
                  name="code"
                  className="border border-gray-400 rounded-xl p-2 bg-transparent"
                >
                  <option value="+91">+91</option>
                  <option value="+009">+009</option>
                </select>

                <input
                  className="flex-1 border border-gray-400 focus:border-blue-500 outline-none p-2 rounded-xl"
                  type="tel"
                  name="contactnumber"
                  value={data.contactnumber}
                  onChange={changehandler}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <br></br>

            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 w-full rounded cursor-pointer"
            >
              update profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Settings;
