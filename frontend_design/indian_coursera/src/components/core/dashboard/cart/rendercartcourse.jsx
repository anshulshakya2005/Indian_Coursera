import { useDispatch, useSelector } from "react-redux";
import Iconbutton from "../../../common/iconbutton";
import { buyCourse } from "../../../../services/operations/studentFeaturesapi";
import { useNavigate } from "react-router-dom";
function Rendercartcourse() {
    const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const handlebuycourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="w-full max-w-sm bg-richblack-800 border border-richblack-700 rounded-xl p-6 shadow-lg text-white">
      
      {/* Heading */}
      <h2 className="text-xl font-semibold text-richblack-5 mb-5">
        🛒 Cart Summary
      </h2>

      {/* Divider */}
      <div className="h-[1px] bg-richblack-600 mb-5" />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-richblack-300 text-sm">
          Total Amount
        </p>
        <p className="text-2xl font-bold text-yellow-50">
          ₹ {total}
        </p>
      </div>

      {/* Note */}
      <p className="text-xs text-richblack-400 mb-5">
        * Final amount includes all applicable taxes
      </p>

      {/* Button */}
      <Iconbutton
        text="Buy Now"
        onClick={handlebuycourse}
        customclasses="
          w-full 
          bg-yellow-400 
          text-richblack-900 
          font-semibold 
          py-3 
          rounded-lg 
          hover:scale-[1.02]
          transition-all 
          duration-200
        "
      />
    </div>
  );
}

export default Rendercartcourse;