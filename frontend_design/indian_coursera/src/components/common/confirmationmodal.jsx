// import Iconbutton from "./iconbutton";

// function Confirmationmodal({modaldata}){


//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-[#2C333F] p-6 rounded-lg text-white">
//                 <p>
//                     {modaldata.text1}
//                 </p>
//                 <p>
//                     {modaldata.text2}
//                 </p>
//                 <div>
//                     <Iconbutton onClick={modaldata?.btn1handler} text={modaldata.btn1Text}/>
//                     <button onClick={modaldata?.btn2handler}>{modaldata?.btn2Text}</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// // export default Confirmationmodal;

// import Iconbutton from "./iconbutton";

// function Confirmationmodal({ modaldata }) {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center 
//       bg-black/40 backdrop-blur-sm z-50"
//     >
//       {/* Modal Box */}
//       <div
//         className="bg-[#2C333F]/90 backdrop-blur-md border border-white/10 
//         p-6 rounded-xl text-white w-[320px] shadow-2xl"
//       >
//         {/* Text */}
//         <p className="text-lg font-semibold">
//           {modaldata.text1}
//         </p>

//         <p className="text-sm text-gray-300 mt-2">
//           {modaldata.text2}
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
          
//           <Iconbutton
//             onClick={modaldata?.btn1handler}
//             text={modaldata.btn1Text}
//             customclasses="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition-all duration-200"
//           />

//           <button
//             onClick={modaldata?.btn2handler}
//             className="bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all duration-200"
//           >
//             {modaldata?.btn2Text}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Confirmationmodal;



import Iconbutton from "./iconbutton";

function Confirmationmodal({ modaldata }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
      bg-black/40 backdrop-blur-sm z-50"
      
      // ✅ click outside to close
      onClick={modaldata?.btn2handler}
    >
      {/* Modal Box */}
      <div
        className="bg-[#2C333F]/90 backdrop-blur-md border border-white/10 
        p-6 rounded-xl text-white w-[320px] shadow-2xl"
        
        // ❌ prevent closing when clicking inside
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <p className="text-lg font-semibold">
          {modaldata.text1}
        </p>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 mt-2">
          {modaldata.text2}
        </p>

        {/* Buttons */}
        <div className="flex justify-around gap-4 mt-6">
          
          {/* 🔴 Logout Button */}
          <Iconbutton
            onClick={modaldata?.btn1handler}
            text={modaldata.btn1Text}
            customclasses="bg-red-500 px-4 py-2 rounded-lg text-white 
            hover:bg-red-600 active:scale-95 transition-all duration-150 shadow-md"
          />
          

          {/* 🟡 Cancel Button */}
          <button
            onClick={modaldata?.btn2handler}
            className="bg-yellow-400 px-4 py-2 rounded-lg text-black font-medium 
            hover:bg-yellow-300 active:scale-95 transition-all duration-150 shadow-md"
          >
            {modaldata?.btn2Text}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Confirmationmodal;