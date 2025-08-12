const express = require('express');
const serviceRoute = express.Router();
const serviceController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/servicesController');

serviceRoute.get('/', serviceController.getService);
serviceRoute.post('/', serviceController.addService);
serviceRoute.delete('/:id', serviceController.deleteService);
serviceRoute.put('/:id', serviceController.updateService);
module.exports = serviceRoute;