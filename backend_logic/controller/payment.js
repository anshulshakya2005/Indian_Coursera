const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
const User = require("../models/user");
const mailsender = require("../utils/mailsender");
const {
  courseEnrollmentEmail,
} = require("../mail/templete/courseEnrollmentEmail");

const { paymentSuccessEmail } = require("../mail/templete/paymentSuccessEmail");
const Courseprogress = require("../models/courseprogress");

exports.capturepayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userid = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide courses",
      });
    }

    let totalamount = 0;

    for (const course_id of courses) {
      const course = await Course.findById(course_id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      if (
        course.studentsenrolled &&
        course.studentsenrolled.some(
          (student) => student.toString() === userid
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Already enrolled in course",
        });
      }

      totalamount += course.price;
    }

    const options = {
      amount: totalamount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Creating Razorpay order...");
    console.log(options);

    const paymentResponse = await instance.orders.create(options);

    console.log("Payment Response:", paymentResponse);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });

  } catch (err) {
    console.error("CAPTURE PAYMENT ERROR:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifypayment = async (req, res) => {
  console.log("VERIFYPAYMENT HIT");
  console.log("BODY:", req.body);
console.log("USER ID:", req.user?.id);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;

    const userid = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userid
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedsignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    console.log("EXPECTED:", expectedsignature);
    console.log("RECEIVED:", razorpay_signature);

    if (expectedsignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    await enrollstudents(courses, userid);

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const enrollstudents = async (courses, userid) => {
  if (!courses || !userid) {
   throw new Error("please provide data for courses or userid");
  }
  for (const courseid of courses) {
    try{
      const enrolledcourse = await Course.findOneAndUpdate(
      { _id: courseid },
      { $push: { studentsenrolled: userid } },
      { new: true },
    );
    if (!enrolledcourse) {
    throw new Error("course not found");
    }
    const enrolledstud = await User.findByIdAndUpdate(
      { _id: userid },
      { $push: { courses: courseid } },
      { new: true },
    );
    const emailResponse = await mailsender(
      enrolledstud.email,
      `success fully enrolled into ${enrolledcourse.coursename}`,
      courseEnrollmentEmail(
        enrolledcourse.coursename,
        `${enrolledstud.firstname}`,
      ),
    );
    console.log("email sent successfully", emailResponse);
    }catch(err){
      console.log(err);
   throw err;
    }
  }
};
// //payment capture and initiate the razorpay order
// exports.capturepayment = async (req, res) => {
//   //get course id and user id
//   //validation
//   //valid courseid and if user already paid
//   //create order
//   //return response
//   const { course_id } = req.body;
//   const userid = req.existing.id;
//   if (!course_id) {
//     return res.status(400).json({
//       success: false,
//       message: "please provide valid course id",
//     });
//   }
//   let coursedetails;
//   try {
//     coursedetails = await Course.findById(course_id);
//     if (!coursedetails) {
//       return res.json({
//         success: false,
//         message: "could not find course",
//       });
//     }
//     const uid = new mongoose.Types.ObjectId(userid);
//     if (coursedetails.studentsenrolled.includes(uid)) {
//       return res.status(400).json({
//         success: false,
//         message: "student is already enrolled",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: true,
//       message: err.message,
//     });
//   }

//   const amount = coursedetails.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseid: course_id,
//       userid,
//     },
//   };

//   try {
//     //initiate the payment useing razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: true,
//       coursename: coursedetails.coursename,
//       coursedescription: coursedetails.coursedescription,
//       thumbnail: coursedetails.thumbnail,
//       orderid: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       message: "not initiated order",
//     });
//   }
// };

// exports.verifysignature = async (req, res) => {
//   const webhooksecret = "12345678";
//   const signature = req.headers["x-razorpay-signature"];
//   const shasum = crypto.createHmac("sha256", webhooksecret);
//   //SHA -> SECURE HASHING ALGORITHM
//   // HMAC -> hashing algorithm + secret key
//   shasum.update(JSON.stringify(req.body));
//   //jab ham hashing algorithm run karte hai , to ek output aata hai us output ke kabhi kabhi digest kahte hai
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("payment is authorized");
//     const { courseid, userid } = req.body.payload.payment.entity.notes;
//     try {
//       //fulfil action
//       //find the course and enroll the student in it
//       const enrolledcourse = await Course.findOneAndUpdate(
//         { _id: courseid },
//         {
//           $push: {
//             studentsenrolled: userid,
//           },
//         },
//         { new: true },
//       );
//       if (!enrolledcourse) {
//         return res.status(500).json({
//           success: false,
//           message: "course not found",
//         });
//       }

//       console.log(enrolledcourse);
//       //find student and update the course vector
//       const enrolledstudent = await User.findOneAndUpdate(
//         {
//           _id: userid,
//         },
//         {
//           $push: {
//             courses: courseid,
//           },
//         },
//         { new: true },
//       );

//       console.log(enrolledstudent);
//       //mail send krdo
//       const emailResponse = await mailsender(
//         enrolledstudent.email,
//         "congratulation ,you are onboarded into course",
//         "congratulation ,you have onboarded into course",
//       );
//       console.log(emailResponse);
//       return res.status(200).json({
//         success: true,
//         message: "signature verified",
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "invalid request",
//     });
//   }
// };

// exports.sendpaymentemail = async (req, res) => {
//   const { orderid, paymentid, amount } = req.body;
//   const userid = req.existing.id;
//   if (!orderid || !paymentid || !amount || !userid) {
//     return res.status(400).json({
//       success: false,
//       message: "please provide all the details",
//     });
//   }
//   try {
//     const enrolledstudent = await User.findById(userid);
//     await mailsender(
//       enrolledstudent.email,
//       `payment Received`,
//       paymentSuccessEmail(
//         `${enrolledstudent.firstname} ${enrolledstudent.lastname}`,
//         amount / 100,
//         orderid,
//         paymentid,
//       ),
//     );
//     return res.status(200).json({
//       success: true,
//       message: "email sent successfully",
//     });
//   } catch (err) {
//     console.log("error ", err);
//     return res.status(400).json({
//       success: false,
//       message: "could not send email",
//     });
//   }
// };
