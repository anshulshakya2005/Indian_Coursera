const express = require("express");
const router = express.Router();
const { auth, isinstructor } = require("../middlewares/auth");
const {
  updateprofile,
  deleteaccount,
  getalluserdetails,
  getEnrolledCourses,
  instructordashboard
} = require("../controller/profile");
router.delete("/deleteProfile", auth, deleteaccount);
router.put("/updateProfile", auth, updateprofile);
router.get("/getUserDetails", auth, getalluserdetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructordashboard",auth,isinstructor,instructordashboard);
module.exports = router;
