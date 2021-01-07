const express = require('express')
const app = express()
const vulnsroutes = require('./routes/vuln-routes')
const loginroutes = require('./routes/login-routes')
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use(vulnsroutes)
app.use(loginroutes)


app.listen(8000, () => {
    console.log('running on port 8000')
})