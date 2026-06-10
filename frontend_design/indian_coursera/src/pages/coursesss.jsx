import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import Confirmationmodal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/ratingstar"

import CourseAccordionBar from "../components/core/course/courseaccordionbar"
import CourseDetailsCard from "../components/core/course/coursedetailscard"

// import { formatDate } from "../services/formatDate"\
import { fetchCourseDetails } from "../services/operations/coursedetailesapi"
import { buyCourse } from "../services/operations/studentFeaturesapi";
// import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Errors from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`)

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setResponse(res?.data?.data?.courseDetails)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])
useEffect(() => {
  console.log("UPDATED RESPONSE:", response)
}, [response])
  

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.ratingandreviews)
    setAvgReviewCount(count)
  }, [response])
  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    ) 
  }
//test
  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.coursecontent?.forEach((sec) => {
      lectures += sec.subsection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

console.log(response)
console.log(response)
console.log(response)
  const {
    _id: course_id,
    coursename,
    coursedescription,
    thumbnail,
    price,
    whatyouwilllearn,
    
    coursecontent,
    ratingandreviews,
    instructor,
    studentsenrolled,
    
  } = response||{}

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
      
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
  <>
    <div className="relative w-full bg-gradient-to-r from-gray-900 via-gray-950 to-black">
      {/* Hero Section */}
     <div className="relative mx-auto max-w-7xl px-6">
        <div className="min-h-[120px]   pr-0 lg:pr-[450px]">
          {/* Thumbnail */}
          {/* <div className="relative block max-h-[30rem] lg:hidden overflow-hidden rounded-xl border border-gray-800 shadow-lg">
            <div className="absolute bottom-0 left-0 h-full w-full shadow-black/50"></div>
            <img
              src={thumbnail}
              alt="course thumbnail"
              className="aspect-auto w-full hover:scale-105 transition-transform duration-300"
            />
          </div> */}

          {/* Text Section */}
          <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-gray-100">

           <p className="text-5xl font-bold text-white leading-tight">
              {coursename}
            </p>

            <p className="max-w-3xl text-lg text-gray-300">
              {coursedescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">

              <span className="font-semibold text-yellow-400">
  {avgReviewCount}
</span>


              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />

              <span className="bg-gray-800 px-2 py-1 rounded-md text-sm">
                {`${ratingandreviews?.length || 0} reviews`}
              </span>

              <span className="bg-gray-800 px-2 py-1 rounded-md text-sm">
                {`${studentsenrolled?.length || 0} students enrolled`}
              </span>

            </div>

            <div className="text-gray-300">
              <p>
                Created By{" "}
                <span className="font-medium text-yellow-400">
                  {`${instructor.firstname} ${instructor.lastname}`}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-gray-400 text-lg">
              <p className="flex items-center gap-2"></p>

              <p className="flex items-center gap-2">
                <HiOutlineGlobeAlt className="text-blue-400" />
                English
              </p>
            </div>
          </div>

          {/* Mobile Buttons */}
          {/* <div className="flex w-full flex-col gap-4 border-y border-gray-800 py-4 lg:hidden">
            <p className="space-x-3 pb-4 text-3xl font-semibold text-yellow-400">
              Rs. {price}
            </p>

            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition">
              Buy Now
            </button>

            <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition">
              Add to Cart
            </button>
          </div> */}
        </div>

        {/* Course Card */}
      <div className="absolute right-16 top-10 block w-[350px] z-50">   
        <CourseDetailsCard
            course={response}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
    </div>

    {/* Lower Section */}
    <div className="mx-auto max-w-7xl px-6 text-gray-100">
      <div className="min-h-[500px] pt-4 pr-[520px]">

        {/* What you'll learn */}
        <div className="my-8 border border-gray-800 bg-gray-900 rounded-xl p-8 shadow-md">
          <p className="text-3xl font-semibold text-white">
            What you'll learn
          </p>
          <div className="mt-5 text-gray-300 leading-relaxed">
            <ReactMarkdown>{whatyouwilllearn}</ReactMarkdown>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-[830px]">
          <div className="flex flex-col gap-3">

            <p className="text-[28px] font-semibold text-white">
              Course Content
            </p>

            <div className="flex flex-wrap justify-between gap-2 text-gray-300">

              <div className="flex gap-2">
                <span className="bg-gray-800 px-2 py-1 rounded-md">
                  {coursecontent?.length || 0} section(s)
                </span>

                <span className="bg-gray-800 px-2 py-1 rounded-md">
                  {totalNoOfLectures} lecture(s)
                </span>
              </div>

              <button
                className="text-yellow-400 hover:text-yellow-300 transition"
                onClick={() => setIsActive([])}
              >
                Collapse all sections
              </button>
            </div>
          </div>

          {/* Accordion */}
          <div className="py-4">
            {coursecontent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>

          {/* Author */}
          <div className="mb-16 mt-10">
  <h2 className="mb-5 text-3xl font-bold text-white">
    Author
  </h2>

  <div className="flex items-center gap-4">
    <img
      src={
        instructor.image
          ? instructor.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstname} ${instructor.lastname}`
      }
      alt="Author"
      className="h-16 w-16 rounded-full object-cover"
    />

    <div>
      <p className="text-xl font-semibold text-white">
        {`${instructor.firstname} ${instructor.lastname}`}
      </p>
    </div>
  </div>

  <p className="mt-5 text-gray-400 leading-7">
    {instructor?.additionaldetails?.about}
  </p>
</div>
        </div>
      </div>
    </div>

    {confirmationModal && (
      <Confirmationmodal modalData={confirmationModal} />
    )}
  </>
)
}

export default CourseDetails;