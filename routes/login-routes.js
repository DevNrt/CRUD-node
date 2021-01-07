const express = require('express')
const api = express.Router()
const logincontrollers = require('../controllers/login-controller')

api.post("/login",logincontrollers.login)

module.exports = api