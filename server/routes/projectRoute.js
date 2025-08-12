const express = require('express');
const ProjectRouter = express.Router();
const projectController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/projectController.js');

ProjectRouter.get('/', projectController.getProjects);
ProjectRouter.post('/', projectController.addProject);
ProjectRouter.put('/:id', projectController.updateProject);
ProjectRouter.delete('/:id', projectController.deleteProject);

module.exports = ProjectRouter;