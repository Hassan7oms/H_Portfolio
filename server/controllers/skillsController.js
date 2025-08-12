const skills= require('../models/skillsInfModel') 


exports.getskills = async (req ,res)=>{
    try{
        const skillsInf = await skills.find();
        res.json(skillsInf);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.addSkill = async(req , res)=>{
    try{
        const newskill = await skills(req.body)
        const createdSkill = newskill.save();
             res.status(201).json(createdSkill);
    }catch(err){
        res.status(400).json({error : err.message})
    }
}




exports.updateskill = async (req,res)=>{
     console.log('Updating skill with ID:', req.params.id);

    try{
        const updatedskill = await skills.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 

    if (!updatedskill) {
            return res.status(404).json({ message: 'skill info not found' });
        }
        res.status(200).json(updatedskill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteSkill = async(req , res)=>{
    try{
        const deletedSkill = await skills.findByIdAndDelete(req.params.id)
       if (!deletedSkill) {
            return res.status(404).json({ message: 'skill not found' });
        }
        res.json({ message: 'skill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}