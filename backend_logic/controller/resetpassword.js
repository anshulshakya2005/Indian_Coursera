const User = require("../models/user");
const mailsender = require("../utils/mailsender");
const bcrypt = require("bcrypt")
//reset password token-->ek link generate karaga and mail par send karega , us link par jakar aap passowrd change kar sakte
exports.resetpasswordtoken = async (req, res) => {
  try {
    //get email for req body
    const { email } = req.body;
    //validation
    const existing = await User.findOne({ email });
    if (!existing) {
      return res.json({
        success: false,
        message: "your email is not registered",
      });
    }
    //check user

    //generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time
    const updateddetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetpasswordexpires: Date.now() + 5 * 60 * 1000 },
      { new: true },
    );
    //send mail containing url

    //returin response

    const url = `http://localhost:5173/update-password/${token}`;

    await mailsender(
      email,
      "password reset link",
      `password reset link:${url}`,
    );
    return res.json({
      success: true,
      message: "email sent successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "error in reset password token generation",
    });
  }
};

//reset password

exports.resetpassword = async(req,res)=>{
    try{
        //data fetch
        const {password,confirmpassword,token} = req.body;
        //validation
        if(password!==confirmpassword){
            return res.status(401).json({
                success:false,
                message:"password not matching "
            })
        }
        //get user details
        const existing = await User.findOne({token:token});

        //if no entry -- invalid token
        if(!existing){
            return res.status(401).json({
                success:false,
                message:"token invalid"
            })
        }
        //token time expire
        if(existing.resetpasswordexpires<Date.now()){
            return res.status(401).json({
                success:false,
                message:"token is expired"
            })
        }
        //hashed passowrd
        const hashedpassword = await bcrypt.hash(password,10);
        //password updae
        await User.findOneAndUpdate({token:token},{password:hashedpassword},{new:true});
        //response return
        return res.status(200).json({
            success:true,
            message:"password reseted"
        })
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"error in resetpassword function"
        })
    }
};

