const { Router } = require("express");

//instance of Router
const router = Router();

//where coding starts as db
const groceryList = [
    {
        item : "milk",
        quantity : 2,
    },
    {
        item : "orange",
        quantity : 2,
    },
    {
        item : "yogurt",
        quantity : 2,
    },
    {
        item : "applejuice",
        quantity : 2,
    },
]

//Check the prefix /api check in index.js
//npm run start:dev
//groceries ---> endpoint
//postman get request-----> http://localhost:3001/api/v1/groceries
router.get("",(request,response,next)=>{ // middlewire should take 3 parameter
    console.log("before handling request");
    next();//----> middleware function
},(request,response,next)=>{
    response.send(groceryList);
    next();
},()=>{
    console.log("finished excuting get function"); // In middleware it should be as console.log() not function
})

//route parameter
//postman get request------> http://localhost:3001/api/v1/groceries/routerlejuice
///groceries/:item -------> Route parameters.
router.get('/:item',(request,response)=>{
    const {item} = request.params; //------>routing params
    const groceriesItem = groceryList.find((g) => g.item === item);
    response.send(groceriesItem);
})

//postman post request-----> http://localhost:3001/api/v1/groceries
//postman->body->form-data -> Key : item,quantity , Value : jackfruit, 2
router.post("",(request,response)=>{
    console.log(request.body); // ------> for postman body
    groceryList.push(request.body) //------> push into groceryList 
    response.sendStatus(201); //----->status code and sendStatus for status
})

module.exports = router;