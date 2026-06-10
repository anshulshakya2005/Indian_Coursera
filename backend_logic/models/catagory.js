const mongoose = require("mongoose")

const catagoryschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    }],
});

module.exports = mongoose.model("catagory",catagoryschema);