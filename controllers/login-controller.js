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
    const sqlInsert = "INSERT INTO vulns (idnessus,cve,name,description,advice,referencias,csv,cliente) VALUES ('"+req.body.idnessus+"','"+req.body.cve+"','"+req.body.name+"','"+req.body.description+"','"+req.body.advice+"','"+req.body.referencias+"','"+req.body.csv+"','"+req.body.cliente+"')"

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