const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accounttype:{
        type:String,
        enum:["admin","student","instructor"],
        required:true,
    },
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"profile",
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    }],
    image:{
        type:String,
        required:true,
    },
    courseprogress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseprogress",
    },
    contact:{
        type:Number,
    },
    token:{
        type:String,
    },
    resetpasswordexpires:{
        type:Date,
    }
})

module.exports = mongoose.model("user",userschema);