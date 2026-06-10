const express = require("express");
const router = express.Router();
const{capturepayment,verifysignature,sendpaymentemail,verifypayment} = require("../controller/payment");
const {auth,isinstructor,isstudent,isadmin} = require("../middlewares/auth");
router.post("/capturepayment",auth,isstudent,capturepayment);
router.post("/verifypayment",auth,isstudent,verifypayment);
module.exports = router;
