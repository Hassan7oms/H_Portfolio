const { error } = require('console');
const contactInf=require('../models/contactInfModel')

exports.getcontact= async(req,res)=>{
    try{ 
        const contacts = await contactInf.find();
        res.json(contacts)

    }catch(err){
        res.status(500).json({error:err.message})

    }
}

exports.updatecontact=async(req,res)=>{
    try{
        const updatedcontact = await contactInf.findByIdAndUpdate(req.params.id,req.body)
        if(!updatedcontact){
            return res.status(403).json({message: 'failed to update'})

        }
        res.status(200).json(updatedcontact)

    }catch(err){
        res.status(400).json({error:err.message})

    }
}


exports.addcontact= async(req,res)=>{
    try{
        const newcontact=new contactInf(req.body);
        const savedcontact= await newcontact.save();
        res.status(201).json(savedcontact);
    }
    catch(err){
        res.status(400).json({error: err.message})
    } 
}

exports.deletecontact= async(req , res )=>{
    try{
        console.log('hellllllllllllllo');
        const deleted = await contactInf.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(403).json({ message: 'contact not found' });
        }
        res.json({ message: 'contact deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}