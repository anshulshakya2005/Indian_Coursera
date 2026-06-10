import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { createRating } from "../../../services/operations/coursedetailesapi";

function Coursereviewmodal({ setreviewmodal }) {
  const [rating, setRating] = useState(0);

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {courseEntireData} = useSelector((state)=>state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("courseexperience", "");
    setValue("courserating", 0);
  }, [setValue]);

  const handleRating = (rate) => {
    setRating(rate);
    setValue("courserating", rate);
  };

  const handleReset = () => {
    setRating(0);
    setValue("courserating", 0);
  };

  const onsubmit = async (data) => {
    await createRating({
        courseId:courseEntireData,
        rating:data.courserating,
        review:data.courseexperience,

    },token);

    setreviewmodal(false);
    console.log("Review Data:", data);
    console.log("Rating:", rating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">

      {/* MODAL */}
      <div className="bg-gray-900 text-white w-[420px] rounded-lg p-5 shadow-xl border border-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Review</h2>

          <button
            onClick={() => setreviewmodal(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.image}
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-medium">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs text-gray-400">Posting publicly</p>
          </div>
        </div>

        {/* FORM INSIDE MODAL */}
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">

          {/* STAR RATING */}
          <div className="flex items-center gap-2">
            <Rating
              onClick={handleRating}
              initialValue={rating}
              allowFraction
               SVGstyle={{ display: "inline-block" }}
  className="flex"
            />
          </div>

          {/* TEXTAREA */}
          <label htmlFor="courseexperience">
            add your experience
          </label>
          <textarea
          id="courseexperience"
            {...register("courseexperience")}
            placeholder="Write your experience..."
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* BUTTONS */}
          <div className="flex gap-3">

            <button
              type="submit"
              className="flex-1 bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 bg-gray-700 rounded hover:bg-gray-600"
            >
              Reset
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Coursereviewmodal;