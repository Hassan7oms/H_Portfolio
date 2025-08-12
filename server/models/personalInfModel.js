const mongoose = require('mongoose');


const personalInfSchema = new mongoose.Schema({
    identifier: {
        type: String,
        default: 'main_personal_info', 
        unique: true
    },
    name: {
        type: String,
        required: true,
        default: 'Your Name',
        trim: true,
        
    },
    title:{
        type: String,
        required:true,
        trim: true,
        default: 'Your Title'
    },
    greeting :{
        type: String,
        required: true,
        trim:true,
        default: 'Hello, I am [Your Name]'
    },
    heroDescription :{
        type: String,
        required: true,
        trim:true,
        default: 'Your Hero Description'
    },

    aboutSubtitle : {
        type: String,
        required: true,
        trim:true,
        default: 'Your About Subtitle'
    },

    aboutStory : {
        type: String,
        required: true,
        trim:true,
        default: 'Your About Story'
    },

    WhatIDo :{
        type: String,
        required: true,
        trim:true,
        default: 'Your What I Do'
    },

    myApproach :{
        type: String,
        required: true,
        trim:true,
        default: 'Your Approach'
    },

    yearsExperience : {
        type: Number,
        required:true,
        trim:true,
        default: 0
    },

    projectsCompleted: {
        type : Number,
        required : true,
        trim:true,
        default: 0
    },

    happyClients: {
        type : Number,
        required : true,
        trim : true,
        default: 0
    },
    


});

module.exports = mongoose.model('personalInfModel',personalInfSchema);