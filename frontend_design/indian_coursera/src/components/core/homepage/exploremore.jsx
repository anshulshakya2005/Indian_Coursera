import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlighttext from "./highlighttext";
import Coursecard from "./coursecard";
const tabnames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];
function Exploremore() {
  const [currenttab, setcurrenttab] = useState(tabnames[0]);
  const [courses, setcourses] = useState(HomePageExplore[0].courses);
  const [currentcard, setcurrentcard] = useState(
    HomePageExplore[0].courses[0].heading,
  );
  const setmycards = (value) => {
    setcurrenttab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setcourses(result[0].courses);
    setcurrentcard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-3xl mt-5 text-center font-semibold">
        Unlock the <Highlighttext text={" Power of code"}></Highlighttext>
      </div>
      <p className="text-center mt-2 mb-4 text-sm">
        Learn to build anything you can imagine
      </p>
      <div className="flex bg-[#424854]  rounded-full p-1 justify-center items-center mx-auto ">
        {tabnames.map((element, idx) => {
          return (
            <div
              className={`text-[13px]  flex flex-row items-center gap-2 ${currenttab === element ? "bg-[#000814] text-white scale-105 shadow-md font-medium" : "font-medium text-[#999DAA] "} rounded-full transition-all duration-200 cursor-pointer hover:bg-[#2C333F]  hover:text-white px-4 py-2 `}
              key={idx}
              onClick={() => setmycards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="h-9"></div>
      <div className="flex flex-row gap-4 mb-[-9%] ">
        {courses.map((element, idx) => {
          return (
            <Coursecard
              key={idx}
              carddata={element}
              currentcard={currentcard}
              setcurrentcard={setcurrentcard}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Exploremore;
