const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        // maxlength: 100,
        // minlength: 3,
        trim: true
    },
    description: {
        type: String,
        // required : true,
        trim:true},
    imgsUrl:{
        type:[String]
    },
    
    category: {
        type: String,
        // required: true,
        // enum: ["Web development", "Mobile Development", "Data Science", "Machine Learning","desktop application", "Other"],
        // default: "Web Development"
    },

    technologies:{
        type:[String],
        // required:true

    },
    liveDemoUrl:{
        type:String,
        trim:true
    },
    githubUrl:{
        type:String,
        trim:true
    }

})

module.exports = mongoose.model("projectsModel", projectSchema);