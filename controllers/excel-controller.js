const db = require('../config/db')
var xlsx = require("xlsx");

function ExcelAJson(req, res) {

    const excel = xlsx.readFile("/Users/devnrt/Downloads/Universidad/Calculo/Proyecto/server/controllers/datos.xlsx");
    var nombreHoja = excel.SheetNames;
    let datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    let i = 0;
    let sqlInsert = "INSERT INTO teletrabajadores (idteletrabajadores,HoraTrabajo,HoraPersonal,HoraTerminar,SatisTeletrabajo,SatisHabitos,SatisPausas,SatisActivClave,ModoAvion,SatisExceder,Ejercicio,Familiar,SatisFiscaMental,Dolores,Transtornos,Ansiedad,Estres) VALUES ";

    for (i = 0; i < datos.length; i++) {

        const idteletrabajadores = datos[i].idtrabajadores;
        const HoraTrabajo = datos[i][" Horas de trabajo"];
        const HoraPersonal = datos[i]["Horas vida personal"];
        const HoraTerminar = datos[i]["Hora en la que termina de ejercer sus actividades laborales"];
        const SatisTeletrabajo = datos[i]["Satisfacción modalidad de teletrabajo"];
        const SatisHabitos = datos[i]["Satisfacción labora hábitos como teletrabajador"];
        const SatisPausas = datos[i]["Satisfacción pausas activas en su rutina laboral"];
        const SatisActivClave = datos[i]["Satisfacción actividades clave y después las demás actividades"];
        const ModoAvion = datos[i]["Satisfacción modo avión del teléfono cuando comienza su rutina como teletrabajador"];
        const SatisExceder = datos[i]["Satisfacción excede en su jornada laboral para cumplir las metas establecidas"];
        const Ejercicio = datos[i]["Satisfacción  ejercicio semanal "];
        const Familiar = datos[i]["Satisfacción relación familiar y personal"];
        const SatisFiscaMental = datos[i]["Satisfacción física y mentalmente"];
        const Dolores = datos[i]["Salud física  dolores lumbares, inflamación de tendones o problemas oculares"];
        const Transtornos = datos[i]["Salud física trastorno de sueño o digestivo por causa de esta modalidad"];
        const Ansiedad = datos[i]["Salud mental  ansiedad social o dificultad para interactuar con grupos de personas luego de entrar a la modalidad de teletrabajo"];
        const Estres = datos[i]["Salud mental tensión o estrés al momento de ejercer sus actividades laborales"];
        if (i == datos.length - 1) {
            sqlInsert += "('" + idteletrabajadores + "','" + HoraTrabajo + "','" + HoraPersonal + "','" + HoraTerminar + "','" + SatisTeletrabajo + "','" + SatisHabitos + "','" + SatisPausas + "','" + SatisActivClave + "','" + ModoAvion + "','" + SatisExceder + "','" + Ejercicio + "','" + Familiar + "','" + SatisFiscaMental + "','" + Dolores + "','" + Transtornos + "','" + Ansiedad + "','" + Estres + "')";
        } else {
            sqlInsert += "('" + idteletrabajadores + "','" + HoraTrabajo + "','" + HoraPersonal + "','" + HoraTerminar + "','" + SatisTeletrabajo + "','" + SatisHabitos + "','" + SatisPausas + "','" + SatisActivClave + "','" + ModoAvion + "','" + SatisExceder + "','" + Ejercicio + "','" + Familiar + "','" + SatisFiscaMental + "','" + Dolores + "','" + Transtornos + "','" + Ansiedad + "','" + Estres + "'),";

        }
    }

    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.send({ status: false, err })
        } else {
            res.send("True")
        }

    })


}

function ConsejoSatis(req, res) {

    let queryTrabajo = "SELECT * FROM teletrabajadores";

    db.query(queryTrabajo, (err, result) => {
        if (err) {
            res.send("false");
        } else {
            //res.send(result);
            var sumaSatisModalidad = 0;
            var sumaSatisHabitos = 0;
            var sumaSatisPausas = 0;
            for (let i = 0; i < result.length; i++) {

                sumaSatisModalidad += result[i].SatisTeletrabajo;
                sumaSatisHabitos += result[i].SatisHabitos;
                sumaSatisPausas += result[i].SatisPausas;
            }
            var mediaSatisModalidad = sumaSatisModalidad / result.length;
            var mediaSatisHabitos = sumaSatisHabitos / result.length;
            var mediaSatisPausas = sumaSatisPausas / result.length;

            var sumaSatisModalidad1 = 0;
            var sumaSatisHabitos1 = 0;
            var sumaSatisPausas1 = 0;

            for (let i = 0; i < result.length; i++) {

                sumaSatisModalidad1 += (result[i].SatisTeletrabajo - mediaSatisModalidad) ^ 2;
                sumaSatisHabitos1 += (result[i].SatisHabitos - mediaSatisHabitos) ^ 2;
                sumaSatisPausas1 += (result[i].SatisPausas - mediaSatisPausas) ^ 2;
            }
            var varianzaSatisModalidad = sumaSatisModalidad1 / result.length;
            var varianzaSatisHabitos = sumaSatisHabitos1 / result.length;
            var varianzaSatisPausas = sumaSatisPausas1 / result.length;

            res.send({ varianzaSatisModalidad, varianzaSatisHabitos, varianzaSatisPausas })
        }

    })

}


function ConsejoHoras(req, res) {

    let queryTrabajo = "SELECT * FROM teletrabajadores";

    db.query(queryTrabajo, (err, result) => {
        if (err) {
            res.send("false");
        } else {

            var sumaHoraPersonal = 0;
            var sumaHoraTerminar = 0;
            var sumaHoraTrabajo = 0;
            for (let i = 0; i < result.length; i++) {

                sumaHoraTrabajo += result[i].HoraTrabajo;
                sumaHoraPersonal += result[i].HoraPersonal;
                sumaHoraTerminar += result[i].HoraTerminar;
            }
            let mediaHoraTrabajo = sumaHoraTrabajo / result.length;
            let mediaHoraPersonal = sumaHoraPersonal / result.length;
            let mediaHoraTerminar = sumaHoraTerminar / result.length;
            res.send({ mediaHoraTrabajo, mediaHoraPersonal, mediaHoraTerminar })
        }

    })

}

function ConsejoActi(req, res) {

    let queryTrabajo = "SELECT * FROM teletrabajadores";

    db.query(queryTrabajo, (err, result) => {
        if (err) {
            res.send("false");
        } else {
            //res.send(result);
            var sumaSatisActiv = 0;
            var sumaModoAvion = 0;
            var sumaSatisExceder = 0;
            for (let i = 0; i < result.length; i++) {

                sumaSatisActiv += result[i].SatisActivClave;
                sumaModoAvion += result[i].ModoAvion;
                sumaSatisExceder += result[i].SatisExceder;
            }
            var mediaSatisActiv = sumaSatisActiv / result.length;
            var mediaModoAvion = sumaModoAvion / result.length;
            var mediaSatisExceder = sumaSatisExceder / result.length;

            var sumaSatisActiv1 = 0;
            var sumaModoAvion1 = 0;
            var sumaSatisExceder1 = 0;

            for (let i = 0; i < result.length; i++) {

                sumaSatisActiv1 += (result[i].SatisActivClave - mediaSatisActiv) ^ 2;
                sumaModoAvion1 += (result[i].ModoAvion - mediaModoAvion) ^ 2;
                sumaSatisExceder1 += (result[i].SatisExceder - mediaSatisExceder) ^ 2;
            }
            var varianzaSatisActiv = sumaSatisActiv1 / result.length;
            var varianzaModoAvion = sumaModoAvion1 / result.length;
            var varianzaSatisExceder = sumaSatisExceder1 / result.length;

            res.send({ varianzaSatisActiv, varianzaModoAvion, varianzaSatisExceder })
        }

    })

}

function ConsejoEjercicio(req, res) {

    let queryTrabajo = "SELECT * FROM teletrabajadores";

    db.query(queryTrabajo, (err, result) => {
        if (err) {
            res.send("false");
        } else {

            var sumaEjercicio = 0;

            for (let i = 0; i < result.length; i++) {

                sumaEjercicio += result[i].Ejercicio;

            }
            let mediaEjercicio = sumaEjercicio / result.length;

            res.send({ mediaEjercicio })
        }

    })

}

function ConsejoSiNO(req, res) {

    let queryTrabajo = "SELECT * FROM teletrabajadores";

    db.query(queryTrabajo, (err, result) => {
        if (err) {
            res.send("false");
        } else {

            var sumaFamiliar = 0;
            var sumaSatisFiscaMental = 0;
            var sumaDolores = 0;
            var sumaTranstorno = 0;
            var sumaAnsiedad = 0;
            var sumaEstres = 0;

            for (let i = 0; i < result.length; i++) {

                sumaFamiliar += result[i].Familiar;
                sumaSatisFiscaMental += result[i].SatisFiscaMental;
                sumaDolores += result[i].Dolores;
                sumaTranstorno += result[i].Transtornos;
                sumaAnsiedad += result[i].Ansiedad;
                sumaEstres += result[i].Estres;

            }
            var mediaFamiliar = sumaFamiliar / result.length;
            var mediaSatisFiscaMental = sumaSatisFiscaMental / result.length;
            var mediaDolores = sumaDolores / result.length;
            var mediaTranstorno = sumaTranstorno / result.length;
            var mediaAnsiedad = sumaAnsiedad / result.length;
            var mediaEstres = sumaEstres / result.length;

            var sumaFamiliar1 = 0;
            var sumaSatisFiscaMental1 = 0;
            var sumaDolores1 = 0;
            var sumaTranstorno1 = 0;
            var sumaAnsiedad1 = 0;
            var sumaEstres1 = 0;

            for (let i = 0; i < result.length; i++) {

                sumaFamiliar1 = (result[i].Familiar - mediaFamiliar) ^ 2;
                sumaSatisFiscaMental1 = (result[i].SatisFiscaMental - mediaSatisFiscaMental) ^ 2;
                sumaDolores1 = (result[i].Dolores - mediaDolores) ^ 2;
                sumaTranstorno1 = (result[i].Transtornos - mediaTranstorno) ^ 2;
                sumaAnsiedad1 = (result[i].Ansiedad - mediaAnsiedad) ^ 2;
                sumaEstres1 = (result[i].Estres - mediaEstres) ^ 2;
            }
            var varianzaFamiliar = sumaFamiliar1 / result.length;
            var varianzaSatisFiscaMental = sumaSatisFiscaMental1 / result.length;
            var varianzaDolores = sumaDolores1 / result.length;
            var varianzaTranstorno = sumaTranstorno1 / result.length;
            var varianzaAnsiedad = sumaAnsiedad1 / result.length;
            var varianzaEstres = sumaEstres1 / result.length;

            res.send({ mediaFamiliar,mediaSatisFiscaMental,mediaDolores,mediaTranstorno,mediaAnsiedad,mediaEstres,varianzaFamiliar, varianzaSatisFiscaMental, varianzaDolores,varianzaTranstorno, varianzaAnsiedad,varianzaEstres })
        }

    })

}

module.exports = {
    ExcelAJson,
    ConsejoHoras,
    ConsejoSatis,
    ConsejoActi,
    ConsejoSiNO,
    ConsejoEjercicio
}




