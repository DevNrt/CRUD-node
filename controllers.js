const mysql = require('mysql')

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"vulnerabilities"
});

function insert(req,res){

    console.log(req.body)

    const sqlInsert = "INSERT INTO vulns (idnessus,cve,name,description,advice,referencias,csv,cliente) VALUES ('"+req.body.idnessus+"','"+req.body.cve+"','"+req.body.name+"','"+req.body.description+"','"+req.body.advice+"','"+req.body.referencias+"','"+req.body.csv+"','"+req.body.cliente+"')"

    db.query(sqlInsert, (err, result) => {

    if(err){
        res.send(err)
    } else{
        res.send("True")
    }

    })
}

function select(req,res){

    const sqlSelect = "SELECT * FROM vulns"
    db.query(sqlSelect, (err,result) => {

        if(err){
            res.send(err)
        } else{
            res.send(result)
        }
    })
}

function update(req,res){
    const sqlUpdate = "UPDATE vulns SET idnessus='"+req.body.idnessus+"' , cve='"+req.body.cve+"', name='"+req.body.name+"', description='"+req.body.description+"', advice='"+req.body.advice+"', referencias='"+req.body.referencias+"', csv='"+req.body.csv+"', cliente='"+req.body.cliente+"' WHERE idvulns='"+req.body.idvulns+"'"
    db.query(sqlUpdate, (err,result) => {

        if(err){
            res.send(err)
        } else{
            res.send('True')
        }
    })
}

function drop(req,res){
    const sqlDelete = "DELETE FROM vulns WHERE idvulns='"+req.query.idvulns+"'"
    db.query(sqlDelete, (err,result) => {

        if(err){
            res.send(err)
        } else{
            res.send('True')
        }
    })
}

function selectbyid(req,res){
    const sqlSelectbyid = "SELECT * FROM vulns WHERE idnessus='"+req.query.idnessus+"'"
    db.query(sqlSelect, (err,result) => {

        if(err){
            res.send(err)
        } else{
            res.send(result)
        }
    })
}

module.exports={
    insert,
    select,
    update,
    drop,
    selectbyid
}