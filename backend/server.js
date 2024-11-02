const express=require("express");
const connectionDB = require("./config/dbConnection");
const app=express();

const dotenv=require("dotenv").config();
const errorHandler=require("./middleware/errorHandler");
const cors = require('cors')

const port=process.env.PORT || 3000;



app.use(cors());
app.use(express.json());

app.use(errorHandler);


connectionDB();


app.use('/api/recipes',require('./routes/recipeRoutes'));

app.use('/api/auth',require('./routes/userRoutes'));




app.listen(port,()=>{
   
    console.log("Listening on Port:",port);
});