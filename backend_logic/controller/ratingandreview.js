const Ratingandreview = require("../models/ratingandreview");
const Course = require("../models/course");
const mongoose = require("mongoose");
//creatreating
exports.createrating = async (req, res) => {
  try {
    //get userid

    //fetch data from req body

    //check if user is enrolled or not

    //check if user had already reviewed the post or not

    //create rating and review

    //course ke sath attach kardo

    //return

    const userid = req.user.id;
    let { rating, review, courseId } = req.body;

// if frontend sends full object
let courseid = null;
if (typeof courseId === "object") {
  courseid = courseId._id;
}
    console.log("userid:", userid);
console.log("courseid:", courseid);
 const coursedetails = await Course.findOne({
  _id: courseid,
  studentsenrolled: userid,
});

    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: "student is not enrolled in course",
      });
    }

   const alreadyreviewed = await Ratingandreview.findOne({
  user: userid,
  course: courseid,
});
    if (alreadyreviewed) {
      return res.status(403).json({
        success: false,
        message: "course is already reviewed by user",
      });
    }
    const ratingreview = await Ratingandreview.create({
      rating,
      review,
      user: userid,
      course: courseid,
    });
  const updatedcoursedetails = await Course.findByIdAndUpdate(
  courseid,
  {
    $push: {
      ratingandreviews: ratingreview._id,
    },
  },
  { new: true }
);
    console.log(updatedcoursedetails);
    return res.status(200).json({
      success: true,
      message: "rating and reviews created",
      ratingreview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error in creating rating and review",
    });
  }
};
//getavgrating
exports.getaveragerating = async(req,res)=>{
    try{
        const courseid = req.body.courseid;
        const result = await Ratingandreview.aggregate([
            {
               $match: {
  course: new mongoose.Types.ObjectId(courseid),
}
            },
            {
                $group:{
                    _id:null,
                   averageRating: { $avg: "$rating" }
                }
            },
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        return res.status(200).json({
            success:true,
            message:"average rating is 0,no rating given till now",
            averageRating:0,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:true,
            message:err.message,
        })
    }
}
//getallrating
exports.getallrating = async(req,res)=>{
    try{
        const allreviews  = await Ratingandreview.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstname lastname email image",
        }).populate({
            path:"course",
            select:"coursename",
        }).exec();
        return res.status(200).json({
  success: true,
  message: "all reviews fetched successfully",
  data: allreviews,
});
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
