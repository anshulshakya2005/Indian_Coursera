const mongoose = require("mongoose")

const subsectionschema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeduration:{
        type:Number,
        default:120,
        required:true
    },
    description:{
        type:String,
    },
    videourl:{
        type:String,
    }
})

module.exports = mongoose.model("subsection",subsectionschema);