const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

//Can have envoirment variables
require("dotenv").config();

//Create Express server
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Establish Database Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database established")
})

const userRouter = require('./routes/users');
const exersiceRouter = require('./routes/exercises');

app.use('/users' , userRouter);
app.use('/exercises', exersiceRouter);

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})