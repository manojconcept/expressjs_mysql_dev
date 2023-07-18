// const express = require('express'),
    // router = express.Router()
// const model = require('../models/employee.service')

const { Router } = require("express");
//instance of Router
const router = Router();

const model = require("../models/employee.model");

//http:// /api/employees/
router.get('/', async (req, res) => {
    const employees = await model.getAllEmployees()
    res.send(employees)
})

router.get('/:id', async (req, res) => {
    const employee = await model.getEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(employee)
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await model.deleteEmployee(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
})

router.post('/', async (req, res) => {
    await model.addOrEditEmployee(req.body)
    res.status(201).send('created successfully.')
})

router.put('/:id', async (req, res) => {
    const affectedRows = await model.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
})



module.exports = router;