const express = require('express');
const experinceRoute = express.Router();
const experinceController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/experinceInfController');

experinceRoute.get('/', experinceController.getExperince);
experinceRoute.post('/', experinceController.addExperince);
experinceRoute.delete('/:id', experinceController.deleteExperince);
experinceRoute.put('/:id',experinceController.updateExperince)
module.exports = experinceRoute;