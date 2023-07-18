//Importing
const { Router, response } = require("express");

//callback
const router = Router();

const marketDb = [
    {
        id: 1,
        shope: 'Dmart',
        miles: 10,
    },
    {
        id: 2,
        shope: 'Wallmart',
        miles: 2.4,
    },
    {
        id: 3,
        shope: 'Max',
        miles: 2.7,
    },
    {
        id: 4,
        shope: 'FashionKing',
        miles: 0.3,
    },
    {
        id: 5,
        shope: 'Supermall',
        miles: 7.9,
    },
    {
        id: 6,
        shope: 'Skywalk',
        miles: 28.8,
    },
]



router.get("", (req, res) => {
    //--------------------------------------------------cookies
    res.cookie("Visited", true, {
        maxAge: 60000,
    })
    const { miles } = req.query;
    console.log(miles); //See in the terminal what typed in query parameters
    const parsedMiles = parseInt(miles); // parseInt is for number
    if (!isNaN(parsedMiles)) {
        const filteredStores = marketDb.filter((s) => s.miles <= parsedMiles);
        res.send(filteredStores);
    } else res.send(marketDb);

});

router.get('/:shope', (request, response) => {
    console.log(request.cookies);
    const { shope } = request.params; //------>routing parameter
    const marketShope = marketDb.find((m) => m.shope === shope);
    response.send(marketShope);
})

router.get("",(req, res) => {});


router.post("/cart/item", (req, res) => {
    const {shope,miles} = req.body; // from postman body
    const cartShop = {id,shope,miles};
    const {cart} = req.session;
    if (cart){
        request.session.cart.shopes.push(cartShop);
    }else{
        req.session.cart = {
            shopes: [cartShop],
        };
    }
    res.send(201);

});




module.exports = router;