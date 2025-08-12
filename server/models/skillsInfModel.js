const mongoose = require('mongoose')
const skillsSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    level:{
        type:Number,
        
        required:true,
        
    },
    iconimgUrl:{
        type:String
    }
})
module.exports = mongoose.model("skillsModel", skillsSchema);
