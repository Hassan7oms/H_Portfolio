const mongoose = require('mongoose');

const contactInf=new mongoose.Schema({
    socialMediaiconImg: {
        type: String,
        required: true,
        trim: true
    },
    socialMediaLink:{
        type : String,
        required:true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
})



module.exports= mongoose.model("contactInfModel",contactInf);