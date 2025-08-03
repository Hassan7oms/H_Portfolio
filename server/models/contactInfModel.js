const mongoose = require('mongoose');

const contactInf=new mongoose.Schema({
    socialMediaicon: {
        type: String,
        required: true,
        trim: true
    },
    socialMediaLink:{
        type : String,
        required:true,
        trim:true
    },
    



})


module.exports= mongoose.model("contact",contactInf);