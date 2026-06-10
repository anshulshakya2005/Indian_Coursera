import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";

function Rendertotalamount() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col gap-4">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-richblack-800 border border-richblack-700 rounded-xl p-4 shadow-md"
        >
          {/* LEFT SIDE */}
          <div className="flex gap-4 items-center">
            <img
              src={course?.thumbnail}
              alt=""
              className="w-[90px] h-[60px] object-cover rounded-md"
            />

            <div className="flex flex-col gap-1">
              <p className="text-richblack-5 font-semibold">
                {course?.coursename}
              </p>

              <span className="text-yellow-50 font-bold text-sm">
                ₹ {course?.price}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= 4 ? (
                    <FaStar key={i} color="#FFD700" size={14} />
                  ) : (
                    <CiStar key={i} size={14} />
                  )
                )}
                <span className="text-xs text-richblack-300 ml-2">
                  ({course?.ratingandreviews?.length || 0})
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <button
            onClick={() => dispatch(removeFromCart(course._id))}
            className="text-pink-200 hover:text-pink-400 transition flex items-center gap-1"
          >
            <MdDelete size={18} />
            <span className="text-sm">Remove</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rendertotalamount;