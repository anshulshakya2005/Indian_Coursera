const mongoose = require("mongoose");
const Section = require("../models/section");
const Subsection = require("../models/subsection");
const Courseprogress = require("../models/courseprogress");
const Course = require("../models/course");

exports.updatecourseprogress = async (req,res)=>{
    const {courseId,subsectionId} = req.body;

    const userid = req.user.id;
    console.log("userid",userid);
    console.log("courseid",courseId);
    console.log("subsectionid",subsectionId);
    try{
        const subsection = await Subsection.findById(subsectionId);
        console.log("subsection",subsection);
        if(!subsection){
            return res.status(404).json({
                success:false,
                error:"invalid subsection",
                message:"subsection not found",
            })
        }
        let courseprogress = await Courseprogress.findOne({
            courseid:courseId,
            userid:userid,
        })
        console.log("courseprogress",courseprogress);
        if (!courseprogress) {
  courseprogress = await Courseprogress.create({
    courseid: courseId,
    userid,
    completedvideos: [],
  });
}
        else{
            if(courseprogress.completedvideos.includes(subsectionId)){
                return res.status(400).json({
                    error:"subsection already completed",
                })
            }
            if (!mongoose.Types.ObjectId.isValid(subsectionId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid subsectionId format",
  });
}
            courseprogress.completedvideos.push(subsectionId);
        }
        await courseprogress.save();
        return res.status(200).json({
            success:true,
            message:"course progress updated",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            error:"internal server error",
            message:"courseprogress not updated",
        })
    }

}