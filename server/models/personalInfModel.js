const mongoose = require('mongoose');


const personalInfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    title:{
        type: String,
        required:true,
        trim:ture
    },
    greeting :{
        type: String,
        required: true,
        trim:true        
    },
    heroDescription :{
        type: String,
        required: true,
        trim:true  
    },

    aboutSubtitle : {
        type: String,
        required: true,
        trim:true  
    },

    aboutStory : {
        type: String,
        required: true,
        trim:true  
    },

    WhatIDo :{
        type: String,
        required: true,
        trim:true  
    },

    myApproach :{
        type: String,
        required: true,
        trim:true  
    },

    yearsExperience : {
        type: Number,
        required:true,
        trim:true
    },

    projectsCompleted: {
        type : Number,
        required : true,
        trim:true
    },

    happyClients: {
        type : Number,
        required : true,
        trim : true
    },
    


});

module.exports = mongoose.module('PersonalInf',personalInfSchema);