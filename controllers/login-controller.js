const db = require('../config/db')

function login(req,res){
    //capturo variable
    //encripto
    //comparo
    const loginQuery = "SELECT * FROM users WHERE username='"+req.body.username+"' AND password='"+req.body.password+"'"

    db.query(loginQuery,(err,result) =>{
        if(err){
            res.send(err)
        } else{
            console.log(result.length)
            if(result.length == 0){
                res.send('usuario no encontrado')
            } else{
                res.send('usuario  encontrado')
            }
        }
    })

}

function insertLogin(req,res){
    //capturo variable
    //encriptar va antes del query
    const sqlInsert = "INSERT INTO users (username,password) VALUES ('"+req.body.username+"','"+req.body.password+"')"

    db.query(sqlInsert, (err, result) => {

    if(err){
        res.send(err)
    } else{
        res.send("True")
    }

    })
}

module.exports={
    login,
    insertLogin
}