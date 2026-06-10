const Subsection = require("../models/subsection");
const Section = require("../models/section");
require("dotenv").config();
const { uploadimagetocloudinary } = require("../utils/imageuploader");
const Course = require("../models/course");

exports.createsubsection = async (req, res) => {
  try {
    const { sectionid, title, timeduration, description } = req.body;
    const video = req.files?.videofile;

    if (!sectionid || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const uploaddetails = await uploadimagetocloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subsectiondetails = await Subsection.create({
      title,
      timeduration,
      description,
      videourl: uploaddetails.secure_url,
    });

    await Section.findByIdAndUpdate(
      sectionid,
      {
        $push: {
          subsection: subsectiondetails._id,
        },
      },
      { new: true }
    );

    // fetch complete course
    const updatedCourse = await Course.findOne({
      coursecontent: sectionid,
    })
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "subsection created successfully",
      data: updatedCourse,
    });

  } catch (err) {
    console.log("CREATE SUBSECTION ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "error in creating subsection",
    });
  }
};

exports.updatesubsection = async (req,res)=>{
try{

const {
title,
timeduration,
description,
subsectionid
}=req.body

if(!subsectionid){
return res.status(400).json({
success:false,
message:"subsection id required"
})
}

const updatedFields={}

if(title)
updatedFields.title=title

if(description)
updatedFields.description=description

if(timeduration)
updatedFields.timeduration=timeduration

if(req.files?.videofile){

const upload=
await uploadimagetocloudinary(
req.files.videofile,
process.env.FOLDER_NAME
)

updatedFields.videourl=
upload.secure_url
}

await Subsection.findByIdAndUpdate(
subsectionid,
updatedFields,
{new:true}
)

// find parent section
const section =
await Section.findOne({
subsection: subsectionid
})

if(!section){
return res.status(404).json({
success:false,
message:"section not found"
})
}

// return complete course
const updatedCourse =
await Course.findOne({
coursecontent: section._id
})
.populate({
path:"coursecontent",
populate:{
path:"subsection"
}
})

return res.status(200).json({
success:true,
message:"subsection updated successfully",
data:updatedCourse
})

}catch(err){

console.log("UPDATE SUBSECTION ERROR:",err)

return res.status(500).json({
success:false,
message:err.message
})

}
}

exports.deletesubsection = async (req,res)=>{
try{

const { subsectionid } = req.body;

if(!subsectionid){
return res.status(400).json({
success:false,
message:"all fields are necessary"
})
}

// find parent section
const section =
await Section.findOne({
subsection: subsectionid
})

if(!section){
return res.status(404).json({
success:false,
message:"section not found"
})
}

// remove subsection from section
await Section.findByIdAndUpdate(
section._id,
{
$pull:{
subsection: subsectionid
}
},
{new:true}
)

// delete subsection
await Subsection.findByIdAndDelete(
subsectionid
)

// fetch updated course
const updatedCourse =
await Course.findOne({
coursecontent: section._id
})
.populate({
path:"coursecontent",
populate:{
path:"subsection"
}
})

return res.status(200).json({
success:true,
message:"subsection deleted successfully",
data: updatedCourse
})

}catch(err){

console.error(err)

return res.status(500).json({
success:false,
message:"error occured while deleting subsection"
})

}
}
