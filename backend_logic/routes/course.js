const express = require("express")
const router = express.Router()
const {
  createcourse,
  showallcourses,
  getcoursedetails,
  editcourse,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse,
} = require("../controller/courses");
const {createcatagory,showallcatagory,catagorypagedetails} = require("../controller/catagory");
const {createsection,updatesection,deletesection} = require("../controller/section");
const {createsubsection,updatesubsection,deletesubsection} = require("../controller/subsection");
const {createrating,getaveragerating,getallrating}=require("../controller/ratingandreview");
const {updatecourseprogress} = require("../controller/courseprogress");
const {auth,isstudent,isinstructor,isadmin} = require("../middlewares/auth");
router.post("/getCourseDetails",auth,getcoursedetails)
router.post("/createCourse",auth,isinstructor,createcourse);
router.post("/addSection",auth,isinstructor,createsection);
router.post("/updateSection",auth,isinstructor,updatesection);
router.delete("/deleteSection",auth,isinstructor,deletesection);
//router.post("/editSubSection",auth,isinstructor,deletesubsection);
router.post("/updateSubSection",auth,isinstructor,updatesubsection);
router.post("/deleteSubSection",auth,isinstructor,deletesubsection);
router.post("/addSubSection",auth,isinstructor,createsubsection);

router.get("/getAllCourses",showallcourses);
router.post("/editCourse",auth,isinstructor,editcourse);
router.post("/updateCourseProgress",auth,isstudent,updatecourseprogress);
router.post("/getCatagoryPageDetails",catagorypagedetails);
router.post("/createCategory",auth,isadmin,createcatagory);
router.get("/showAllCategories",showallcatagory);
router.post("/createRating",auth,isstudent,createrating);
router.get("/getAverageRating",getaveragerating);
router.get("/getReviews",getallrating);



router.post("/getFullCourseDetails", auth, getFullCourseDetails)


router.get(
  "/getInstructorCourses",
  auth,
  isinstructor,
  getInstructorCourses
)

router.delete("/deleteCourse", deleteCourse)
module.exports = router;