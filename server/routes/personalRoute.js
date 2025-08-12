const express = require('express');
const personalRoute = express.Router();
const personalController = require('C:/Users/mazen/OneDrive/Desktop/NTI_MEAN/cosmic-portfolio/H_Portfolio/server/controllers/personalInfcontroller');

personalRoute.get('/', personalController.getpersonalInf);
personalRoute.put('/', personalController.updatepersonalInf);


module.exports = personalRoute;