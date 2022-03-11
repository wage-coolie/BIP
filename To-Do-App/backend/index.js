
// STARTING POINT OF OUR BACKEND SERVER


// importing Necessary packages
	// importing express : SERVER
const express = require("express");
	// importing helmet : helps us secure our HTTP request by adding multiple header
const helmet = require("helmet");
	// importing helmet : Helps in log management of the app
const morgan = require("morgan");
	// importing cors : to help us send and recieve Cross Origin Request 
const cors = require("cors");
	// importing dotenv : Using this to import env variable
const dotenv = require('dotenv');
	// importing mongoose : for connnection to mongo db atlas
const mongoose = require("mongoose");


// Importing The Message Route
const task = require('./routes/task.js');

// Initialise express server to const app
const app = express();

// MIDDLEWARE

	// using helemt for middleware
app.use(helmet());
	// using morgan for better logging
app.use(morgan('common'));
	// using cors for inter-domain request - Cross Origin Resource Sharing
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DB_URL , {useNewUrlParser : true , useUnifiedTopology : true})
	.then(() => console.log('Mongo connection established to Task App'))
	.catch((err) => console.log(err))

	// askign the app to use json parsing which comes pre-bulit in expres
app.use(express.json());


// Starting the server
app.listen(process.env.PORT || 8000,() => console.log(`we are running on ${process.env.PORT || 8000}`));



// Here we will initialise all our route

// Basic get route
app.get('/',(req,res)=>{
	res.send("Hello , the todo App")
})

app.use('/api/tasks',task)