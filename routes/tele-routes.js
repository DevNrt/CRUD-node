const express = require('express')
const api = express.Router()
const telecontrollers = require('../controllers/tele-controller')

api.post("/insert",telecontrollers.insert)
api.get("/select",telecontrollers.select)
api.get("/delete",telecontrollers.drop)


module.exports = api