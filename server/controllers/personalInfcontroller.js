const personalInf = require('../models/personalInfModel');


exports.getpersonalInf = async (req ,res)=>{
    try{
        const personalinfs = await personalInf.find();
        
        if (personalinfs.length === 0) {
           
            const newPersonalInfo = new personalInf();
            await newPersonalInfo.save();
           
            const updatedPersonalinfs = await personalInf.find();

            return res.json(updatedPersonalinfs);
        }
        res.json(personalinfs);
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.updatepersonalInf = async (req, res) => {
    try {
        const updatedpersonalInf = await personalInf.findOneAndUpdate(
            { identifier: 'main_personal_info' },         
            req.body,              
            { new: true, runValidators: true,upsert:true } 
        );
        
        res.status(200).json(updatedpersonalInf);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
