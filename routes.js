const express = require('express')
const api = express.Router()
const vulncontrollers = require('./controllers')

api.post("/insert",vulncontrollers.insert)
api.get("/select",vulncontrollers.select)
api.post("/update",vulncontrollers.update)
api.get("/delete",vulncontrollers.drop)
api.get("/selectbyid",vulncontrollers.selectbyid)
module.exports = api