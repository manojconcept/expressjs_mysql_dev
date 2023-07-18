const { Router } = require("express");

const router = Router();

const nameList = [
    {
        id: "1",
        name: "manoj",
    },
    {
        id: "2",
        name: "sunder pitchai",

    },
    {
        id: "3",
        name: "sathiya Mandal",

    },
    {
        id: "4",
        name: "Steve Job",
    },
]

router.get("", (req, res) => {
    res.send(nameList);
})

router.get("/:name", (req, res) => {
    const { name } = req.params;
    // console.log(name);
    const nameName = nameList.find((n) => n.name === name);
    res.send(nameName);
})




module.exports = router;