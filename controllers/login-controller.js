const db = require('../config/db')
const bcrypt = require('bcrypt')

function login(req,res){

    const loginQuery = "SELECT * FROM users WHERE username='"+req.body.username+"'"
     
        db.query(loginQuery,(err,result) =>{
            if(err){
                res.status(500).send(err)
            } else{
                if(result.length == 0){
                    res.status(400).send('usuario no encontrado')
                } else{
                    bcrypt.compare(req.body.pass,result[0].pass,function(err,data){
                        if(data == true){
                            res.status(200).send({
                                result: result[0].pass,
                                status: '200',
                                text:'Usuario encontrado'
                            })
                        } else{
                            res.status(400).send('Datos incorrectos');
                        }
                    });
              }
            }
        })

}

function insertLogin(req,res){
    const pass = req.body.pass
    bcrypt.hash(pass,10,function(err,data){
        if(data){
            const sqlInsert = "INSERT INTO users (username,pass) VALUES ('"+req.body.username+"','"+data+"')"

            db.query(sqlInsert, (err, result) => {

                if(err){
                    res.send(err)
                } else{
                    res.send("True")
                }
            
                })
        } else{
            res.send(err)
        }
    });
    
    
}

module.exports={
    login,
    insertLogin
}