const mongoose = require('mongoose');
const Services =new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required:true,
        trim:true

    },
    icon:{
        type:String
    }
})
module.exports = mongoose.model("servicesModel", Services);