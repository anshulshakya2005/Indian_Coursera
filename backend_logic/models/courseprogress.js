const mongoose = require("mongoose")

const courseprogressschema = new mongoose.Schema({
    courseid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    completedvideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subsection",
        }
    ],
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
})

module.exports = mongoose.model("courseprogress",courseprogressschema);