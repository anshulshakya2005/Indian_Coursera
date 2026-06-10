const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../models/user");

//auth
exports.auth = async(req,res,next)=>{
console.log("🔥 AUTH MIDDLEWARE HIT");
    try{
        //extract token
        console.log("starting of first typy block");
        const authHeader = req.headers.authorization;

const token =
    req.cookies?.token ||
    req.body?.token ||
    (authHeader && authHeader.split(" ")[1]) ||
    null;

console.log("TOKEN FOUND:", token);
         console.log("just after token fetch line");
        //if token missing
        
        console.log("above missing token if");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing",
            });
        }
        console.log("entring try block");
        try{
            console.log("entered try block");
            const decode =jwt.verify(token,process.env.JWT_SECRET);
              console.log("✅ DECODE SUCCESS:", decode);
            console.log(decode);
            req.user = decode;
        }catch(err){
            console.log("❌ VERIFY FAILED:", err.message); // ADD THIS
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }
        next();

    }catch(error){
        console.log(error.message);
        return res.status(401).json({
            success:false,
            error:error.message,
            message:"something went veryyyyyy wrong .",
        })
    }
}
//isstudent

exports.isstudent = async(req,res,next)=>{
    try{
        if(req.user.accounttype!=="student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"isstudent middleware not working well"
        })
    }
}

//isinstructor
exports.isinstructor=async(req,res,next)=>{
    try{
        if(req.user.accounttype!=="instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for instructor",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"isinstructor middleware is not working well"
        })
    }
}
//isadmin

exports.isadmin = async(req,res,next)=>{
    try{
        if(req.User.accounttype!=="admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            })
           
        }
         next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"isadmin is not working well"
        })
    }
}
