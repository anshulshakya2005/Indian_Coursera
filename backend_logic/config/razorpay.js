const Razorpay = require("razorpay");

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);
console.log("SECRET PRESENT:", !!process.env.RAZORPAY_SECRET);
console.log("KEY:", process.env.RAZORPAY_KEY);
console.log(
  "SECRET LENGTH:",
  process.env.RAZORPAY_SECRET?.length
);
exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});