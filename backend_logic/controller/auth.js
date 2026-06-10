const User = require("../models/user");
const Otp = require("../models/otp");
const Otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const {uploadimagetocloudinary} = require("../utils/imageuploader");
const mailsender = require("../utils/mailsender");
require("dotenv").config();
//otp send
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    //check if user already exist
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    //generate otp
    var otp = Otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("generated otp is ", otp);

    //checkunique otp or not
    const result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = Otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }

    const otppayload = { email, otp };

    //create an entry in db for otp

    const otpbody = await Otp.create(otppayload);
    console.log(otpbody);
    res.status(200).json({
      success: true,
      message: "otp sent successfully .",
    });
  } catch (err) {
    console.log("error in send otp function of controller", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//signup
exports.signup = async (req, res) => {
  try {
    //data fetch for request body
    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accounttype,
      contact,
      otp,
    } = req.body;
    //validate data
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "all field are required",
      });
    }

    //2 passwords compare
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message:
          "password and confirmpassword value does not match please try again",
      });
    }
    //check if user already exist or not
    const existing = await User.findOne({ email }).populate("additionaldetails").exec();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "user is already registered ",
      });
    }
    //find most recent otp or not
    // Find the most recent OTP
const otps = await Otp.find({ email })
  .sort({ createdat: -1 })
  .limit(1);

if (otps.length === 0) {
  return res.status(400).json({
    success: false,
    message: "otp not found",
  });
}

// Take the first (latest) OTP
const recentotp = otps[0];

// Debug: see what is being compared
console.log("Entered OTP:", otp, "Recent OTP:", recentotp.otp);

// Compare as strings, trim spaces just in case
if (otp.toString().trim() !== recentotp.otp.toString().trim()) {
  return res.status(400).json({
    success: false,
    message: "invalid otp",
  });
}
    //passwrod hash

    const hashedpassword = await bcrypt.hash(password, 10);
    //entry created

    const newprofile = await Profile.create({
      gender: null,
      dateofbirth: null,
      about: "write something about you",
      contactnumber: null,
    });
    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      accounttype,
      additionaldetails: newprofile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    });
    await newuser.populate("additionaldetails");
    //return response
    console.log(newuser);
    return res.status(200).json({
      success: true,
      message: "user entry created",
      newuser,
    });
  } catch (error) {
    console.log("error in signup function of controller", error);
    return res.status(400).json({
      success: false,
      message: "error in signup",
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    //get data form request body
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "all the field are necessary to fill",
      });
    }
    //user check

    const existing = await User.findOne({ email }).populate(
      "additionaldetails",
    ).exec();

    if (!existing) {
      return res.status(401).json({
        success: false,
        message: "user not exist",
      });
    }
    //generate token  jwt,after password matching
    const payload = {
      email: existing.email,
      id: existing._id,
      //role ya accounttype
      accounttype: existing.accounttype,
    };
    if (await bcrypt.compare(password, existing.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      existing.token = token;
      existing.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        existing,
        message: "logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect .",
      });
    }
  } catch (error) {
    console.log("error in login ", error);
    return res.status(400).json({
      success: false,
      message: "error in login , please try later .",
    });
  }
};

//changepassword

exports.changepassword = async (req, res) => {
  try {
    const { email, oldpassword, newpassword, comparenewpassword } = req.body;
    if (!email || !oldpassword || !newpassword || !comparenewpassword) {
      return res.status(403).json({
        success: false,
        message: "all fields are mandetory and to be filled neccessarly",
      });
    }

    if (newpassword !== comparenewpassword) {
      return res.status(400).json({
        success: false,
        message: "pleass fill the new password correctly ",
      });
    }

    const existing = await User.findOne({ email });
    if (!existing) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    //const hashedoldpassword = await bcrypt.hash(oldpassword,10);
    const ismatch = await bcrypt.compare(oldpassword, existing.password);
    if (!ismatch) {
      return res.status(401).json({
        success: false,
        message: "old password not matched",
      });
    }
    const hashednewpassword = await bcrypt.hash(newpassword, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashednewpassword },
      { new: true },
    );

    try {
      const mailresponse = await mailsender(
        email,
        "password updated",
        `<h1>password changed </h1>`,
      );
    } catch (err) {
      console.log("Mail failed", err);
    }

    return res.status(200).json({
      success: true,
      message: "password updated successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in updating password",
    });
  }
};
exports.updateDisplayPicture = async (req, res) => {
  console.log("FILES:.................................................. from backend", req.files);
console.log("USER:", req.user);
  try {
    console.log("FILES:", req.files);
    console.log("USER:", req.user);

    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadimagetocloudinary(
      displayPicture,
      process.env.FOLDER_NAME
    );

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Image Updated successfully",
      data: updatedProfile,
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};