const Catagory = require("../models/catagory");
const Course = require("../models/course");
exports.createcatagory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "all filds are compalsery",
      });
    }

    const catagorydetails = await Catagory.create({
      name: name,
      description: description,
    });
    return res.status(200).json({
      success: true,
      message: "entry of catagory created",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.showallcatagory = async (req, res) => {
  try {
    const allcatagories = await Catagory.find(
      {},
      { name: true, description: true },
    );
    return res.status(200).json({
      success: true,
      message: "fetched ",
      allcatagories,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//catagory page details

exports.catagorypagedetails = async (req, res) => {
  try {
    //get catagoryid
    //get coursed for specified catagoryid
    //validation
    //different catagory courses
    //get top selling courses
    //return
    const { catagoryid } = req.body;
   const selectedcatagory = await Catagory.findById(catagoryid)
  .populate({
    path: "course",
    populate: {
      path: "instructor",
      select: "firstname lastname email",
    },
  })
  .exec();

  selectedcatagory.course.forEach(course => {
  console.log("this is instructor nmae ",course.instructor);
});
    if (!selectedcatagory) {
      return res.status(500).json({
        success: false,
        message: "no course for selected catagory",
      });
    }
const differentcatagories = await Catagory.find({
  _id: { $ne: catagoryid },
})
.populate({
  path: "course",
  populate: {
    path: "instructor",
    select: "firstname lastname email",
  },
})
.exec();
    const topSellingCourses = await Course.aggregate([
      {
        $addFields: {
          studentsCount: { $size: "$studentsenrolled" },
        },
      },
      {
        $sort: { studentsCount: -1 },
      },
      {
        $limit: 10,
      },
    ])
    const topSellingCourseIds = topSellingCourses.map(c => c._id);

const populatedTopSellingCourses = await Course.find({
  _id: { $in: topSellingCourseIds }
}).populate({
  path: "instructor",
  select: "firstname lastname email",
});;
    const categoryIds = topSellingCourses.map(
      (course) => course.catagory
    );
const topcategories = await Catagory.find({
  _id: { $in: categoryIds },
})
.populate({
  path: "course",
  populate: {
    path: "instructor",
    select: "firstname lastname email",
  },
});
    return res.status(200).json({
      success: true,
      data: {
        selectedcatagory,
        differentcatagories,
        topSellingCourses: populatedTopSellingCourses,
        topcategories,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"error in fetching all courses related to the catagory",
    })
  }
};
