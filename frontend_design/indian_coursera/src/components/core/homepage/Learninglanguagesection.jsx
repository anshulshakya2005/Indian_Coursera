import Highlighttext from "./highlighttext";
import img1 from "../../../assets/Images/Know_your_progress.png";
import img2 from "../../../assets/Images/Compare_with_others.png";
import img3 from "../../../assets/Images/Plan_your_lessons.png";
import Ctabutton from "./ctabutton";
function Learninglanguagesection(){
    return (
        <div className="w-225 flex items-center justify-center ml-10">
            <div className="flex flex-col gap-5 m-24 ">
                <div className="text-4xl font-semibold text-center ">
                    Your Swiss Knife For 
                    <Highlighttext text={" Learning any language"}></Highlighttext>
                </div>
                <div className="text-center mx-auto font-medium w-[80%]">
                    Using spin making learning multiple language easy.with 20+ language realistic voice-over progress tracking, custom schedule and more.
                </div>
                <div className="flex flex-row items-center justify-center w-62.5 ml-60">
                    <img src={img1} className="-mr-14"></img>
                    <img src={img2}></img>
                    <img src={img3} className="-ml-20"></img>
                </div>
                <div className="flex items-center justify-center p-4">
                    <Ctabutton active={true} linkto={"./signup"}>
                    <div>
                        Learn more
                    </div>
                    </Ctabutton>
                </div>
            </div>
        </div>
    )
}
export default Learninglanguagesection;