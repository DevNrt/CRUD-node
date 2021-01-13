const express = require('express')
const api = express.Router()
const logincontrollers = require('../controllers/login-controller')

api.post("/login",logincontrollers.login)
api.post("/insertLogin",logincontrollers.insertLogin)

module.exports = api