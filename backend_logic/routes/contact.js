const express = require("express")
const router = express.Router()
const {contactus} = require("../controller/contactus");
router.post("/contact",contactus);
module.exports = router; 