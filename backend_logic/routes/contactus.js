const express = require("express");
const router = express.Router();

// import controller
const { contactus } = require("../controller/contactus");

// route
router.post("/contact", contactus);

module.exports = router;