import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"

function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isEnrolled =
    course?.studentsenrolled?.includes(user?._id)

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user?.accountType === "instructor") {
      toast.error("Instructors cannot buy courses")
      return
    }

    if (token) {
      dispatch(addToCart(course))
      toast.success("Added to cart")
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add this course to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">

      {/* Thumbnail */}
      <div>
        <img
          src={course?.thumbnail}
          alt={course?.coursename}
          className="h-[180px] w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2 p-6">

        {/* Price */}
        <div>
          <p className="text-2xl font-bold text-white">
            Rs. {course?.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          <button
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolledcourses")
                : handleBuyCourse
            }
            className="w-full rounded-md bg-yellow-400 py-3 font-semibold text-black transition-all duration-200 hover:bg-yellow-300"
          >
            {isEnrolled ? "Go To Course" : "Buy Now"}
          </button>

          {!isEnrolled && (
            <button
              onClick={handleAddToCart}
              className="w-full rounded-md border border-gray-600 bg-gray-900 py-3 font-medium text-white transition-all duration-200 hover:bg-gray-700"
            >
              Add To Cart
            </button>
          )}
        </div>

        {/* Money Back */}
        <p className="text-center text-xs text-gray-400">
          30-Day Money-Back Guarantee
        </p>

        {/* Includes */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">
            This Course Includes :
          </h3>

          <div className="space-y-2">
           {console.log("Instructions:", course?.instructions)}

{course?.instructions?.length > 0 ? (
  course.instructions.map((item, index) => (
    <div
      key={index}
      className="flex items-start gap-2 text-sm text-green-400"
    >
      <BsFillCaretRightFill className="mt-1 text-xs flex-shrink-0" />
      <span>{item}</span>
    </div>
  ))
) : (
  <p className="text-red-500">No instructions found</p>
)}
          </div>
        </div>

        {/* Share */}
        <div className="pt-2 text-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-400 transition-all hover:text-yellow-300"
          >
            <FaShareSquare size={14} />
            Share
          </button>
        </div>

      </div>
    </div>
  )
}

export default CourseDetailsCard