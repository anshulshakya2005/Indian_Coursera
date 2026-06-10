const Section = require("../models/section");
const Course = require("../models/course");
const section = require("../models/section");

exports.createsection = async (req, res) => {
  try {
    const { sectionname, courseid } = req.body;
    if (!sectionname || !courseid) {
      return res.status(400).json({
        success: false,
        message: "all the fields are required for the section creation",
      });
    }
    const newsection = await Section.create({ sectionname });
   const updatedcourse = await Course.findByIdAndUpdate(
  courseid,
  {
    $push: {
      coursecontent: newsection._id,
    },
  },
  {
    returnDocument: "after",
  }
)
.populate({
  path: "coursecontent",
  populate: {
    path: "subsection",
  },
})
.exec();

    return res.status(200).json({
        success:true,
        message:"section created successfully",
        data:updatedcourse,
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"error occered",
        error:err.message,
    })
  }
};

exports.updatesection = async (req, res) => {
  try {

    const { sectionname, sectionid, courseid } = req.body;

    if (!sectionname || !sectionid || !courseid) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    await Section.findByIdAndUpdate(
      sectionid,
      { sectionname },
      { new: true }
    );

    // fetch updated course
    const updatedCourse = await Course.findById(courseid)
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatedCourse,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

exports.deletesection = async (req, res) => {
  try {

    const { sectionid, courseid } = req.body;

    if (!sectionid || !courseid) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // remove section from course
    await Course.findByIdAndUpdate(courseid, {
      $pull: {
        coursecontent: sectionid,
      },
    });

    // delete section
    await Section.findByIdAndDelete(sectionid);

    // fetch updated course
    const updatedCourse = await Course.findById(courseid)
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
      updatedCourse,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "error occurred",
      error: err.message,
    });
  }
};