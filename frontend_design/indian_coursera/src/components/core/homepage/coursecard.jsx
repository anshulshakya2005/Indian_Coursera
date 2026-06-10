import { MdPeopleAlt } from "react-icons/md";
import { FaChartDiagram } from "react-icons/fa6";

function Coursecard({key,carddata,currentcard,setcurrentcard}){
    return (
        <div onClick={()=>setcurrentcard(carddata.heading)} className={` w-65 cursor-pointer  h-65 flex flex-col ${currentcard===carddata.heading ?" bg-[#FFC000] text-[#424854] shadow-[10px_10px_0px_rgba(0,0,0,1)]":"bg-[#161D29] "} p-4 `}>
            <div className={`text-2xl ${currentcard===carddata.heading ?"text-black ":"text-white"}  font-semibold mt-2 mb-1.5`}>{carddata.heading}</div>
            <div className={`${currentcard===carddata.heading ?"text-[#161D29] ":"text-[#838894]"} font-semibold text-sm  h-50`}>{carddata.description}</div>
            <div className="flex flex-row justify-around items-center ">
                <div className="flex items-center gap-1">
                    <div><MdPeopleAlt /></div>
                    <div>{carddata.level} </div>
                </div>
                <div className="flex items-center gap-1">
                    <div><FaChartDiagram /></div>
                    <div>{carddata.lessionNumber} Lessons </div>
                </div>
            </div>
        </div>
    )
}
export default Coursecard;

// key={idx}
//               carddata={element}
//               currentcard={currentcard}
//               setcurrentcard={setcurrentcard}
//             />
// heading : "Learn HTML",
//                 description : "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
//                 level : 'Beginner',
//                 lessionNumber : 6