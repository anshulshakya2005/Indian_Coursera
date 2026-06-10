const Course = require("../models/course");
const section = require("../models/section")
const subsection = require("../models/subsection")

const Catagory = require("../models/catagory");
const User = require("../models/user");
require("dotenv").config();
const { uploadimagetocloudinary } = require("../utils/imageuploader");
const courseprogress = require("../models/courseprogress");

const { convertSecondsToDuration } = require("../utils/sectoduration")

//create course
exports.createcourse = async (req, res) => {
  try {
    //fetch
    const {
      coursename,
      coursedescription,
      whatyouwilllearn,
      price,
      catagory,
      tag,
      instructions,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;
    if (!thumbnail) {
  return res.status(400).json({
    success: false,
    message: "Thumbnail image is required",
  });
}
    if (
      !coursename ||
      !coursedescription ||
      !whatyouwilllearn ||
      !price ||
      !catagory ||
      !tag||
      !instructions
    ) {
      return res.status(200).json({
        success: false,
        message: "all field are required",
      });
    }

    const userid = req.user.id;
    const instructordetails = await User.findById(userid);
    console.log("instructor details", instructordetails);

    if (!instructordetails) {
      return res.status(400).json({
        success: false,
        message: "instructor not found ",
      });
    }

    //check given tag is valid or nt
    const catagorydetail = await Catagory.findById(catagory);
    if (!catagorydetail) {
      return res.status(404).json({
        success: false,
        message: "tag details not found",
      });
    }

    //upload image

    const thumbnailimage = uploadimagetocloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );

    //create an entry fr new course

const newcourse = await Course.create({
  coursename,
  coursedescription,
  instructor: instructordetails._id,
  whatyouwilllearn,
  price,
  catagory: catagorydetail._id,
  thumbnail: (await thumbnailimage).secure_url,
  tag,
  instructions,
  status: req.body.status || "Draft",
});

    //add new course to user schema

    await User.findByIdAndUpdate(
      {
        _id: instructordetails._id,
      },
      {
        $push: {
          courses: newcourse._id,
        },
      },
      { new: true },
    );

    await Catagory.findByIdAndUpdate(
      {
        _id: catagorydetail._id,
      },
      {
        $push: {
          course: newcourse._id,
        },
      },
      {
        new: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newcourse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "failed to create course",
    });
  }
};

exports.editcourse = async (req, res) => {
  try {
    const { courseid } = req.body;
    const updates = req.body;
    const cours = await Course.findById(courseid);
    if (!cours) {
      return res.status(404).json({
        error: "course not found",
      });
    }
    if (req.files && req.files.thumbnailImage) {
  console.log("thumbnail image");

  const thumbnail = req.files.thumbnailImage;

  const thumbnailImage = await uploadimagetocloudinary(
    thumbnail,
    process.env.FOLDER_NAME
  );

  cours.thumbnail = thumbnailImage.secure_url;
}

Object.keys(updates).forEach((key) => {

  if (key === "instructions") {
    cours[key] = JSON.parse(updates[key]);
  } 
  
  else {
    cours[key] = updates[key];
  }

});
    await cours.save();
    const updatedcourse = await Course.findOne({
      _id: courseid,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionaldetails",
        },
      })
      .populate("catagory")
      .populate("ratingandreviews")
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "course updated",
      data: updatedcourse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};

//get all course
exports.showallcourses = async (req, res) => {
  try {
    const allcourse = await Course.find(
      {},
      {
        coursename: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingandreviews: true,
        studentsenrolled: true,
      },
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "data form all coures",
      data: allcourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "cannot fetch data",
      error: err.message,
    });
  }
};

exports.getcoursedetails = async (req, res) => {
  try {
    //getid
    const { courseid } = req.body;
    //find course details
const coursedetails = await Course.findById(courseid)
  .populate({
    path: "instructor",
    populate: {
      path: "additionaldetails",
    },
  })
  .populate("catagory")
  .populate("ratingandreviews")
  .populate({
    path: "coursecontent",
    populate: {
      path: "subsection",
    },
  });
if (!coursedetails) {
  return res.status(400).json({
    success: false,
    message: "could not find the course with courseid",
  });
}
    return res.status(200).json({
      success: true,
      message: "course details fetched successfully",
      data: {
  courseDetails: coursedetails
}
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getFullCourseDetails = async(req,res)=>{
  try{
    const {courseid} = req.body
    const userid = req.user.id
    console.log("REQ BODY:", req.body);
console.log("COURSE ID:", req.body.courseid);
if (!courseid) {
  return res.status(400).json({
    success: false,
    message: "courseid missing",
  });
}
    const coursedetails = await Course.findById(courseid).populate({
      path:"instructor",
      populate:{
        path:"additionaldetails",
      },
    })
    .populate("catagory")
    .populate("ratingandreviews")
    .populate({
      path:"coursecontent",
      populate:{
      path:"subsection"
      }
    })
    .exec()
    let courseProgressCount = await courseprogress.findOne({
      courseid:courseid,
      userid:userid,
    })
    console.log("course progress count",courseProgressCount)
    if(!coursedetails){
      return res.status(400).json({
        success:false,
        message:`could not find course with id ${courseid}`,
      })
    }
    let totaldurationinseconds = 0;

coursedetails?.coursecontent?.forEach((content) => {
  content?.subsection?.forEach((subsection) => {
    const time = parseInt(subsection?.timeduration || 0);
    totaldurationinseconds += time;
  });
});

    const totalduration = convertSecondsToDuration(totaldurationinseconds)
    return res.status(200).json({
      success:true,
      data:{
        coursedetails,
        totalduration,
        completedvideos: courseProgressCount?.completedvideos? courseProgressCount?.completedvideos:[],
      },
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}

exports.getInstructorCourses  = async(req,res)=>{
  try{

    const instructorid = req.user.id
    const instructorcourses = await Course.find({
      instructor:instructorid,
    }).sort({createdAt:-1}).populate({
      path:"coursecontent",
      populate:{
        path:"subsection"
      },
    }).exec();
    res.status(200).json({
      success:true,
      data:instructorcourses,
    })
  }catch(err){
    console.error(err);
    res.status(500).json({
      success:false,
      message:"failed to retrive instructor course",
      error:err.message,
    })
  }
}

exports.deleteCourse = async (req,res)=>{
  try{

    const {courseid} = req.body;
    const course = await Course.findById(courseid)
    
    if(!course){
      return res.status(404).json({
        message:"course not found"
      })
    }
    const studentsenrolled = course.studentsenrolled
    for(const studentid of studentsenrolled){
      await User.findByIdAndUpdate(studentid,{
        $pull:{course:courseid},
      })
    }
    const coursesection = course.coursecontent
    for (const sectionid of coursesection){
      const sections = await section.findById(sectionid)
      if(sections){
        const subsections = sections.subsection
        for(const subsectionid of subsections){
          await subsection.findByIdAndDelete(subsectionid)
        }
      }
      await section.findByIdAndDelete(sectionid)
    }

    await Course.findByIdAndDelete(courseid);
    return res.status(200).json({
      success:true,
      message:"course deleted successfully",
    })
  }catch(err){
    console.error(err)
    return res.status(500).json({
      success:false,
      message:"server error",
      error:err.message,
    })
  }
}
