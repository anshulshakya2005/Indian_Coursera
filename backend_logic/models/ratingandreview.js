const mongoose = require("mongoose")

const ratingandreviewschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }
});

module.exports = mongoose.model("ratingandreview",ratingandreviewschema)