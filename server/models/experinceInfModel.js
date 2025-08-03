const mongoose = require('mongoose');

const experinceInf = mongoose.Schema({

    startDate : {
        type: Number,
        required : true,
        trim: true
    },

    endDate : {
        type: Number,
        required : true,
        trim: true
        
    },

    title:{
        type : String,
        required:true,
        trim:true
    },

    description:{
        type: String,
        required:true,
        trim:true
    }

    


});