const Project = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/models/ProjectModel.js')

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

exports.addProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProject = async (req,res)=>{
    try{
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'project info not found' });
        }
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



