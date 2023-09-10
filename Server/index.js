//[SECTION] Dependencies and Modules
	const express = require("express");
	const mongoose = require("mongoose");
	const cors = require("cors");
	const userRoutes = require("./routes/user");
	const courseRoutes = require("./routes/course");


//[SECTION] Environment Setup
	const port = 4000;

//[SECTION] Server Setup
	const app = express();
	
	app.use(cors())
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));


//[SECTION] Database Connection 
	mongoose.connect("mongodb+srv://admin:admin123@batch297.wrxktxt.mongodb.net/S43-S47?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	let db = mongoose.connection;
	db.on('error', console.error.bind(console,'Connection error'));
	db.once('open', () => console.log('Connected to MongoDB Atlas.'));

//[SECTION] Backend Routes 
	//http://localhost:4000/users
	app.use("/users", userRoutes);
	//http://localhost:4000/courses
	app.use("/courses", courseRoutes);


//[SECTION] Server Gateway Response
	if(require.main === module) {
		app.listen( process.env.PORT || port, () => {
			console.log(`API is now online on port ${ process.env.PORT || port }`)
		});
	}


module.exports = {app,mongoose};
