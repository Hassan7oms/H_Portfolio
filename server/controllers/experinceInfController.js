const { error } = require('console');
const experinceInf =require('../models/experinceInfModel')

exports.getExperince= async(req,res)=>{
    try{
        const experinceInfs = await experinceInf.find();
        res.json(experinceInfs);
    } catch(err){
        res.status(500).json({err:err.message})
    }
};

exports.addExperince= async (req,res)=>{
    try{
        const newExperince= new experinceInf(req.body);
        const savedexperinceInf = await newExperince.save();
        res.status(201).json(savedexperinceInf);
    } catch(err){
        res.status(400).json({error:err.message})

    }
}

exports.updateExperince = async(req , res )=>{
    try{
        
        const updatedExperince = await experinceInf.findByIdAndUpdate(req.params.id,req.body,{new :true,runValidators:true})
        if(!updatedExperince){
            return res.status(404).json({message: 'updated succesfully'})
        }
        res.status(200).json(updatedExperince)
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
}

exports.deleteExperince = async (req,res)=>{
    try{
        const deleted  = await experinceInf.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({message :'experince not found' })
        }
        res.json({message:'experince deleted succesfully'})
    } catch(err){
        res.status(500).json({error : err.message})

    }
}