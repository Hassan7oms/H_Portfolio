const port = 3000
const express = require ('express')
const app = express();
const mongoose = require('mongoose')
const contactRoute = require('./routes/contactRoute')
const experinceRoute = require('./routes/experinceroute')
const personalRoute = require('./routes/personalRoute')
const serviceRoute = require('./routes/servicesRoute')
const skillsRoute = require('./routes/skillsRoute')
const cors = require('cors'); // Import CORS

const projectRouter=require('./routes/projectRoute')
mongoose.connect('mongodb://localhost:27017/')
app.use(cors()); // Enable CORS for all routes

app.use(express.json());


app.use('/project',projectRouter);
app.use('/contact',contactRoute);
app.use('/experience',experinceRoute);
app.use('/personal',personalRoute);
app.use('/service',serviceRoute);
app.use('/skill',skillsRoute);

app.listen(port,()=>{
    console.log("server is running in port " +port)
})