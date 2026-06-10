// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Iconbutton from "../../common/iconbutton";

// function Myprofile() {
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>My profile</h1>

//       {/* Profile Header */}
//       <div>
//         <div>
//           <div>
//             <img
//               src={user?.image || "https://i.pravatar.cc/40"}
//               alt={`profile-${user?.firstname}`}
//               className="aspect-square w-[78px] rounded-full object-cover"
//             />
//             <div>
//               <p>{user?.firstname + " " + user?.lastname}</p>
//               <p>{user?.email}</p>
//             </div>
//           </div>

//           <Iconbutton
//             text="Edit"
//             onClick={() => navigate("/dashboard/settings")}
//           />
//         </div>
//       </div>

//       {/* About Section */}
//       <div>
//         <div>
//           <div>About</div>
//           <div>{user?.additionaldetails?.about}</div>
//         </div>

//         <Iconbutton
//           text="Edit"
//           onClick={() => navigate("/dashboard/settings")}
//         />
//       </div>

//       {/* Personal Details */}
//       <div>
//         <div className="flex justify-around">
//           <div>Personal details</div>
//           <Iconbutton
//             text="Edit"
//             onClick={() => navigate("/dashboard/settings")}
//           />
//         </div>

//         <div>
//           <div className="flex justify-around">
//             <div>
//               <div>firstname</div>
//               <div>{user?.firstname}</div>
//             </div>

//             <div>
//               <div>lastname</div>
//               <div>{user?.lastname}</div>
//             </div>
//           </div>

//           <div className="flex justify-around">
//             <div>
//               <div>email</div>
//               <div>{user?.email}</div>
//             </div>

//             <div>
//               <div>contact number</div>
//               <div>
//                 {user?.additionaldetails?.contactnumber ||
//                   "add contact number"}
//               </div>
//             </div>
//           </div>
//             <div className="flex justify-around">
//             <div>
//               <div>gender</div>
//               <div>{user?.additionaldetails?.gender||"add gender"}</div>
//             </div>

//             <div>
//               <div>date of birth</div>
//               <div>{user?.additionaldetails?.dateofbirth||"add date of birth"}</div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Myprofile;



import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Myprofile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const EditBtn = () => (
    <button
      onClick={() => navigate("/dashboard/settings")}
      className="px-4 py-1.5 text-sm font-semibold rounded-lg
      bg-yellow-400 text-black
      hover:bg-yellow-300 active:scale-95
      transition-all duration-200 shadow-md hover:shadow-yellow-300/50"
    >
      Edit
    </button>
  );

  return (
    <div className=" w-full flex justify-center items-center mx-auto bg-[#000814] text-white overflow-hidden">

      {/* MAIN CONTAINER (FIT SCREEN FIX) */}
      <div className="flex justify-around gap-24 overflow-y-auto p-6">

        {/* TITLE */}
        {/* <div className="text-3xl font-bold mb-6 tracking-wide">
          My Profile
        </div> */}

        {/* PROFILE CARD */}
        <div className="backdrop-blur-xl w-[550px] bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div className="flex items-center gap-4">
              <img
                src={user?.image || "https://i.pravatar.cc/100"}
                alt={`profile-${user?.firstname}`}
                className="w-15 h-15 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
              />

              <div>
                <p className="text-md font-semibold">
                  {user?.firstname + " " + user?.lastname}
                </p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>

            <EditBtn />
          </div>

          {/* ABOUT */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center ">
              <h2 className="font-semibold text-md">About</h2>
              <EditBtn />
            </div>
            <p className="text-gray-300 text-sm">
              {user?.additionaldetails?.about || "No about info added yet."}
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Personal Details</h2>
              <EditBtn />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <Detail label="First Name" value={user?.firstname} />
              <Detail label="Last Name" value={user?.lastname} />
              <Detail label="Email" value={user?.email} />
              <Detail
                label="Contact"
                value={user?.additionaldetails?.contactnumber || "Add contact number"}
              />
              <Detail
                label="Gender"
                value={user?.additionaldetails?.gender || "Add gender"}
              />
              <Detail
                label="Date of Birth"
                value={user?.additionaldetails?.dateofbirth || "Add DOB"}
              />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* DETAIL COMPONENT */
function Detail({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-black/30 border border-white/10 hover:border-yellow-400/40 transition">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white font-medium mt-1">{value}</p>
    </div>
  );
}

export default Myprofile;