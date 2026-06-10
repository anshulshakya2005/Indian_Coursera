import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="group flex items-center justify-between rounded-md bg-gray-900 px-3 py-2 text-gray-200 transition hover:bg-gray-800">

      {/* Left side */}
      <div className="flex items-center gap-3">
        <HiOutlineVideoCamera className="text-gray-400 group-hover:text-yellow-400 transition" />

        <p className="text-sm font-medium text-gray-200 group-hover:text-white">
          {subSec?.title || "Untitled Lecture"}
        </p>
      </div>

      {/* Right side (optional duration if exists) */}
      {subSec?.time || subSec?.duration ? (
        <span className="text-xs text-gray-400">
          {subSec?.time || subSec?.duration}
        </span>
      ) : null}
    </div>
  )
}

export default CourseSubSectionAccordion