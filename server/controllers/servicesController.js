const { error } = require('console');
const services = require('../models/servicesModel')

exports.getService= async (req , res )=>{
    try{
        const returnedservicess= await services.find();
        res.json(returnedservicess);

    }catch(err){
        res.status(500).json({error:err.message})
    }

}


exports.addService = async (req, res)=>{
    try{
        const newservice = await services(req.body)
        const savedservice = newservice.save();
        res.status(201).json(savedservice);
    }catch(err){
        res.status(400).json({error : err.message})
    }
}

exports.updateService = async (req, res) => {
    try {
        const updatedService = await services.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const deleted = await services.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'service not found' });
        }
        res.json({ message: 'service deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};