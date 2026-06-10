const Profile = require("../models/profile");
const User = require("../models/user");
const Course = require("../models/course")
const subsection = require("../models/subsection")
const courseprogress = require("../models/courseprogress");
const { convertSecondsToDuration } = require("../utils/sectoduration");
exports.updateprofile = async (req,res)=>{
    try{
        //get data
        //get userid
        //validate
        //find profile
        //update profile
        //return
        const {dateofbirth="",about="write something about your self",contactnumber,gender} = req.body;
        const id = req.user.id;
        if(!contactnumber||!gender){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }
        const userdetails = await User.findById(id);
        const profileid = userdetails.additionaldetails;
        const profiledetails = await Profile.findById(profileid);
        profiledetails.dateofbirth = dateofbirth;
        profiledetails.about = about;
        profiledetails.gender = gender;
        profiledetails.contactnumber = contactnumber;

        await profiledetails.save();
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profiledetails,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error occured during profile updation",
        })
    }
}

exports.deleteaccount = async (req,res)=>{
    try{
        //get id
        //validation
        //delete profile
        //user delete
        //return 
        const id = req.user.id;
        const userdetails =await User.findById(id);
        if(!userdetails){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }

         await Course.updateMany(
      { studentsenrolled: id },
      {
        $pull: { studentsenrolled: id },
      }
    );
        await Profile.findByIdAndDelete({_id:userdetails.additionaldetails});
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"deleted ",
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"error in deleting the account",
        })
    }
}

exports.getalluserdetails = async (req,res)=>{
    try{
        const id = req.user.id;
        const userdetails = await User.findById(id).populate("additionaldetails").exec();
        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            data:userdetails
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userid is", userId);

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "coursecontent",
          populate: {
            path: "subsection",
          },
        },
      })
      .exec();

    // ❌ FIX: check BEFORE toObject()
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    userDetails = userDetails.toObject();

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let SubsectionLength = 0;

      const courseContent = userDetails.courses[i].coursecontent || [];

      for (let j = 0; j < courseContent.length; j++) {
        const subsections = courseContent[j].subsection || [];
       
        // ✅ SAFE reduce
        totalDurationInSeconds += subsections.reduce(
  (acc, curr) => acc + Number(curr.timeduration || 120),
  0
);

        SubsectionLength += subsections.length;
        console.log("SUBSECTIONS SAMPLE:", subsections);
      }

      userDetails.courses[i].totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);

      let courseProgressCount = await courseprogress.findOne({
        courseid: userDetails.courses[i]._id,
        userid: userId,
      });

      // ✅ SAFE optional chaining
      courseProgressCount =
        courseProgressCount?.completedvideos?.length || 0;

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }
    console.log("user details courseresponse",userDetails.courses)
    return res.status(200).json({
      success: true,
      data: userDetails.courses || [],
    });
  } catch (error) {
    console.error("GET ENROLLED COURSES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructordashboard= async (req,res)=>{
    try{
        const coursedetails = await Course.find({instructor:req.user.id});
        const coursedata = coursedetails.map((course)=>{
            const totalstudentsenrolled = course.studentsenrolled.length;
            const totalamountgenerated = totalstudentsenrolled*course.price;
            //create a new object with the additional fields
            const coursedatawithstats = {
                _id:course._id,
                coursename :course.coursename,
                coursedescription:course.coursediscription,
                totalstudentsenrolled,
                totalamountgenerated,
            }
            return coursedatawithstats;
        })  
        res.status(200).json({
            courses:coursedata
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}