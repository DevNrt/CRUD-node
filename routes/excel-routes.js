const express = require('express')
const api = express.Router()
const excelcontrollers = require('../controllers/excel-controller')

api.post("/exceltojson",excelcontrollers.ExcelAJson)
api.post("/consejoHoras",excelcontrollers.ConsejoHoras)
api.post("/consejoSatis",excelcontrollers.ConsejoSatis)
api.post("/consejoActi",excelcontrollers.ConsejoActi)
api.post("/consejoSiNO",excelcontrollers.ConsejoSiNO)
api.post("/consejoEjercicio",excelcontrollers.ConsejoEjercicio)



module.exports = api
