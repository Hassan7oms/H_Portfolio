const mongoose = require('mongoose');

const experinceInf = mongoose.Schema({

    startDate : {
        type: Date,
        required : true,
        trim: true
    },

    endDate : {
        type: Date,
        required : true,
        trim: true,
        default:null
        
    },

    jobTitle:{
        type : String,
        required:true,
        trim:true
    },

    responsibilities:{
        type: String,
        required:true,
        trim:true
    },
    
    companyName:{
        type:String,
        required:true
    }

    

    


});
module.exports= mongoose.model("experinceInfModel",experinceInf);