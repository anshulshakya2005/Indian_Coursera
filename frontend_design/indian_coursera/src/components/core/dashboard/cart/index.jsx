import { useSelector } from "react-redux";
import Rendercartcourse from "./rendercartcourse";
import Rendertotalamount from "./rendertotalamount";

function Cart() {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <div className="w-full min-h-screen bg-richblack-900 text-white p-6 flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Cart</h1>
        <p className="text-richblack-300 mt-1">
          Total Items: {totalItems}
        </p>
      </div>

      {/* Cart Content */}
      {totalItems > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left - Courses */}
          <div className="flex-1">
            <Rendertotalamount />
          </div>

          {/* Right - Summary */}
          <div className="w-full lg:w-[320px]">
            <Rendercartcourse />
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-xl text-richblack-300">
            🛒 Your cart is empty
          </p>
          <p className="text-sm text-richblack-400 mt-2">
            Add courses to start learning
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;