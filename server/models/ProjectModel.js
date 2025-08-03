const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3,
        trim: true
    },
    description: {
        type: String,
        required : true,
        trim:true},
    
    category: {
        type: String,
        required: true,
        enum: ["Web development", "Mobile Development", "Data Science", "Machine Learning","desktop application", "Other"],
        default: "Web Development"
    }

})

module.exports = mongoose.model("Project", projectSchema);