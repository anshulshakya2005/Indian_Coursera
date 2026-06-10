import Instructor from "../../../assets/Images/Instructor.png";
import Ctabutton from "./ctabutton";
import { FaArrowRight } from "react-icons/fa";
import Highlighttext from "./highlighttext";
function Instructorsection() {
  return (
    <div className="mt-14">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%] ">
          <img src={Instructor} className=""></img>
        </div>
        <div className="w-[50%] flex flex-col gap-10 ">
          <div className="text-3xl font-semibold w-[90%] ">
            Become an
            <Highlighttext text={" Instructor"}></Highlighttext>
          </div>
          <p className="w-[90%] ">
            Instructor from around the world teach millions of students on
            studynotion. we provide the tools and skills to teach what you love.
          </p>
          <div className="flex">
            <Ctabutton active={true} linkto={"./signup"}>
              {" "}
              <div className="flex flex-row gap-3 items-center">
                <div>Start Teaching Today</div> <FaArrowRight />
              </div>
            </Ctabutton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Instructorsection;
