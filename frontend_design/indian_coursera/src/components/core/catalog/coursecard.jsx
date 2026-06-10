import { useEffect, useState } from "react";
import RatingStars from "../../common/ratingstar";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

function Course_card({course,Height}){
    
    const [avgReviewcount,setavgreviewcount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingandreviews);
        setavgreviewcount(count);
    },[course]);
    console.log("this is the course name ",course);
console.log("this is the insructior name",course.instructor);
    return(
        <div>

        <Link to={`/courses/${course._id}`}>
  <div className="m-4 w-[320px] overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-700">

  <div className="overflow-hidden">
    <img
      src={course?.thumbnail}
      alt="Course Thumbnail"
      className={`${Height || "h-[140px]"} w-full object-cover transition-transform duration-300 hover:scale-105`}
    />
  </div>

  <div className="p-3">
    <h2 className="text-base font-semibold text-white line-clamp-2">
      {course?.coursename}
    </h2>

    <p className="mt-1 text-sm text-gray-400">
      {course?.instructor?.firstname} {course?.instructor?.lastname}
    </p>

    <div className="mt-2 flex items-center gap-2">
      <span className="font-semibold text-yellow-400">
        {avgReviewcount || 0}
      </span>

      <RatingStars Review_Count={avgReviewcount} />

      <span className="text-xs text-gray-500">
        ({course?.ratingandreviews?.length || 0} ratings)
      </span>
    </div>

    <p className="mt-2 text-lg font-bold text-green-400">
      ₹{course?.price}
    </p>
  </div>
</div>
</Link>
        
        </div>
    )
}
export default Course_card;