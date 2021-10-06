const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function login(req, res) {

    const loginQuery = "SELECT * FROM users WHERE username='" + req.body.username + "'"

    db.query(loginQuery, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length == 0) {
                res.status(400).send('Datos incorrectos')
            } else {
                    res.status(200).send({
                        status: '200',
                        text: 'Usuario encontrado'
                    })

            }
    }
}
)}




function insertLogin(req, res) {

            const verify = "SELECT idusers FROM calculo.users"


            db.query(verify, (err, result) => {
                let id = (result.length) + 1;
                const sqlInsert = "INSERT INTO calculo.users (idusers,username,pass) VALUES ('" + id + "','" + req.body.username + "','" + req.body.pass + "')"
                db.query(sqlInsert, (err, result) => {
                    if (err) {
                        res.send("false")
                    } else {
                        res.send("True")
                    }

                })

            })




        }




        module.exports = {
            login,
            insertLogin
        }