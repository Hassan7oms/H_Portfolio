const express = require('express');
const skillRoute = express.Router();
const skillController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/skillsController');

skillRoute.get('/', skillController.getskills);
skillRoute.post('/', skillController.addSkill);

skillRoute.delete('/:id',skillController.deleteSkill);
skillRoute.put('/:id', skillController.updateskill);
module.exports = skillRoute;