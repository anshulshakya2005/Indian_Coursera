const mongoose = require("mongoose")
const mailsender = require("../utils/mailsender");
const otpschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});

//to send email
async function sendvarificationemail(email,otp){
    try{
        const mailresponse = await mailsender(email,"verification email for indiancorsera",otp);
        console.log("email sent successfully",mailresponse);
    }catch(err){
        console.log("there was an error while sending mail",err);
        throw err;
    }
}

otpschema.pre("save",async function(next){
    await sendvarificationemail(this.email,this.otp);
    // next();
})
module.exports = mongoose.model("otp",otpschema);