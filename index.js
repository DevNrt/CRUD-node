const express = require('express')
const app = express()
const vulnsroutes = require('./routes/tele-routes')
const loginroutes = require('./routes/login-routes')
const excelroutes = require('./routes/excel-routes')
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use(vulnsroutes)
app.use(loginroutes)
app.use(excelroutes)


app.listen(8000, () => {
    console.log('running on port 8000')
})