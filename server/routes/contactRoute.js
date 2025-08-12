const express = require('express');
const contactRoute = express.Router();
const contactController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/contactInfController');

contactRoute.get('/', contactController.getcontact);
contactRoute.post('/', contactController.addcontact);
contactRoute.delete('/:id', contactController.deletecontact);
contactRoute.put('/:id', contactController.updatecontact);
module.exports = contactRoute;