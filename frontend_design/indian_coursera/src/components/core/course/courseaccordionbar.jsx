import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive?.includes(course?._id))
  }, [isActive, course?._id])

  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setSectionHeight(active ? contentEl.current?.scrollHeight : 0)
  }, [active])

  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        border border-gray-800
        bg-gray-900
        text-gray-100
        shadow-sm
        transition-all
      "
    >
      {/* Header */}
      <div
        onClick={() => handleActive(course._id)}
        className="
          flex cursor-pointer items-center justify-between
          bg-gray-900
          px-6 py-4
          hover:bg-gray-800
          transition-colors
        "
      >
        <div className="flex items-center gap-3">
          <i
            className={`transition-transform duration-300 ${
              isActive?.includes(course._id) ? "rotate-180 text-blue-400" : "rotate-0 text-gray-400"
            }`}
          >
            <AiOutlineDown size={18} />
          </i>

          <p className="text-base font-medium text-gray-100">
            {course?.sectionName}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-blue-300">
            {course?.subsection?.length || 0} lectures
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentEl}
        className="
          overflow-hidden
          bg-gray-950
          transition-all duration-300 ease-in-out
        "
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          {course?.subsection?.map((subSec, i) => (
            <div
              key={i}
              className="
                rounded-md
                bg-gray-900
                px-3 py-2
                text-sm text-gray-300
                hover:bg-gray-800
                transition-colors
              "
            >
              <CourseSubSectionAccordion subSec={subSec} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}