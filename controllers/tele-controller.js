const db = require('../config/db')

function insert(req,res){
    const verify = "SELECT idteletrabajadores FROM calculo.teletrabajadores"
    
    db.query(verify, (err, result) => {
        let id = (result.length) + 1;
        const sqlInsert = "INSERT INTO teletrabajadores (idteletrabajadores,HoraTrabajo,HoraPersonal,HoraTerminar,SatisTeletrabajo,SatisHabitos,SatisPausas,SatisActivClave,ModoAvion,SatisExceder,Ejercicio,Familiar,SatisFiscaMental,Dolores,Transtornos,Ansiedad,Estres) VALUES ('" + id + "','"+req.body.HoraTrabajo+"','"+req.body.HoraPersonal+"','"+req.body.HoraTerminar+"','"+req.body.SatisTeletrabajo+"','"+req.body.SatisHabitos+"','"+req.body.SatisPausas+"','"+req.body.SatisActivClave+"','"+req.body.ModoAvion+"','"+req.body.SatisExceder+"','"+req.body.Ejercicio+"','"+req.body.Familiar+"','"+req.body.SatisFiscaMental+"','"+req.body.Dolores+"','"+req.body.Transtornos+"','"+req.body.Ansiedad+"','"+req.body.Estres+"')"
        db.query(sqlInsert, (err, result) => {
            if(err){
                
                res.status(403).send(err)
            } else{
                res.send("True")
            }
        
    
        })
    })

   
}

function select(req,res){

    const sqlSelect = "SELECT * FROM teletrabajadores"
    db.query(sqlSelect, (err,result) => {

        if(err){
            res.status(404).send(err)
        } else{
            res.send(result)
        }
    })
}



function drop(req,res){
    const sqlDelete = "DELETE FROM teletrabajadores WHERE idteletrabajadores='"+req.query.idteletrabajadores+"'"
    db.query(sqlDelete, (err,result) => {

        if(err){
            console.log("error")
            res.status(403).send(err)
        } else{
            res.send('True')
        }
    })
}


module.exports={
    insert,
    select,
    drop
}