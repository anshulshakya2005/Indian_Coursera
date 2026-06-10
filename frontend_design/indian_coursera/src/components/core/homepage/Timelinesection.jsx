import "./time.css";
import timeline from "../../../assets/Images/TimelineImage.png";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
function Timelinesection(){
    return (
        <div>
            <div className="flex flex-row max-w-300  mx-auto gap-5 m- justify-center">
                <div className="relative flex flex-col gap-7 m-5 justify-center">

    {/* Vertical Line */}
    <div className="absolute mt-7 left-4.5 top-0 h-75 border-l-2 border-dotted border-gray-400"></div>

    <div className="flex flex-row items-center gap-5">
        <div className="z-10 bg-white p-1 rounded-full">
            <img src={logo1} className="w-7 h-7" />
        </div>
        <div className="flex flex-col">
            <div className="text-xl font-semibold">Leadership</div>
            <div>Fully committed to the success Company.</div>
        </div>
    </div>

    <div className="flex flex-row items-center gap-4">
        <div className="z-10 bg-white p-1 rounded-full">
            <img src={logo2} />
        </div>
        <div className="flex flex-col">
            <div className="text-xl font-semibold">Responsibility</div>
            <div>Students will always be our top priority.</div>
        </div>
    </div>

    <div className="flex flex-row items-center gap-4">
        <div className="z-10 bg-white p-1 rounded-full">
            <img src={logo3} />
        </div>
        <div className="flex flex-col">
            <div className="text-xl font-semibold">Flexibility</div>
            <div>The ability to switch is an important skill.</div>
        </div>
    </div>

    <div className="flex flex-row items-center gap-4">
        <div className="z-10 bg-white p-1 rounded-full">
            <img src={logo4} className="w-7 h-7" />
        </div>
        <div className="flex flex-col">
            <div className="text-xl font-semibold">Solve the problem</div>
            <div>Code your way to a solution.</div>
        </div>
    </div>

</div>
                <div className="relative shadow-2xl rounded-[20px]">
                    <img src={timeline} className="h-82.5 w-100 m-8"></img>
                    <div className="absolute bg-[#014A32] flex flex-row w-82.5 text-white uppercase p-2 left-[15%] translate-y-[-80%] ">
                        <div className="flex flex-row gap-2 items-center border-r border-[#05A77B] p-2">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-sm  ">years of experience</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center p-2">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-sm  ">type of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Timelinesection;