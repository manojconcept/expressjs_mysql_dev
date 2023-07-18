//import
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./config/database");
require('express-async-errors') 
//Routes
const groceriesRoute = require("./controllers/groceries");
const namelistRoute = require("./controllers/namelist");
const marketList = require("./controllers/market");
const employee = require("./controllers/employee.controller");


//callback function
const app = express();
const upload = multer();

//variables 
const port = 3001;

// locate middleware function should -------------> postman body
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true})); //-------------->for bodyParsing form-data postman
app.use(upload.array()); //------------>{}

//-------------------->cookie parser
app.use(cookieParser());
//-------------------->cookie parser
app.use(
    session({
        secret: 'APIOH09UHU0H809UU30RU32ROHDJFHPODSAOFHDAFJ',
        resave: false,
        saveUninitialized: false,
    })
    )


//--------->middleware
app.use((req,res,next)=>{
    console.log(`${req.method}:${req.url}`); // -> get/post : /url
    next();
})

//Locate the Routes
//This Router prefix with /api
//postman get request-----> http://localhost:3001/api/v1/groceries
app.use("/api/v1/groceries",groceriesRoute);
app.use("/api/v1/name",namelistRoute);
app.use("/api/v1/market",marketList);
app.use("/api/v1/employee",employee);
///------------------------------------------------->To catch errors in models.
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})

// old for enabling port and server
// app.listen(port, ()=>console.log(`Running Express Server on ${port}!`)); 
db.query("SELECT 1")
    .then(() => {
        console.log('db connection  succeeded.')
        app.listen(port, ()=>console.log(`Running Express Server on ${port}!`)); 
    })
    .catch(err => console.log('db connection failed. \n' + err))




