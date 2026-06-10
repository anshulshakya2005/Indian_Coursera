import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";

import CourseInformationform from "./Courseinformation/courseinformationform";
import CourseBuilderform from "./coursebuilder/coursebuilderform";
import Publishcourse from "./publishcourses/index"
function Randersteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish course" },
  ];

  return (
    <div className="w-full">

      {/* STEP CIRCLES */}
      <div className="flex items-center justify-between">

        {steps.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">

              {/* Circle */}
              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full border-2 font-semibold

                  ${
                    step === item.id
                      ? "bg-yellow-500 border-yellow-100 text-black"
                      : step > item.id
                      ? "bg-yellow-500 border-yellow-500 text-black"
                      : "bg-[#161D29] border-[#2C333F] text-[#838894]"
                  }
                `}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>

              {/* Title */}
              <p className="mt-3 text-sm text-richblack-5">
                {item.title}
              </p>
            </div>

            {/* Connecting line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  mb-8 h-[2px] flex-1
                  mx-3
                  ${
                    step > item.id
                      ? "bg-yellow-500"
                      : "bg-[#2C333F]"
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="mt-10">
        {step === 1 && <CourseInformationform />}
        {step === 2 && <CourseBuilderform />}
        {step === 3 && <Publishcourse/>}
      </div>

    </div>
  );
}

export default Randersteps;