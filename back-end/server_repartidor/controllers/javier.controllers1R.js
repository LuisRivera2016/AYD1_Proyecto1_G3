//query post-mysql
import {createTransport } from "nodemailer";

import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
  } from "../config/db.js";

import {createConnection } from "mysql";

var conn = createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,
    port:DB_PORT
})

conn.connect(function(err){
    if(err)throw err
    console.log("Conexion a mysql!")
    
})



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//LISTADO DE SOLICITUDES DE CREACION DE USUARIO/REPARTIDORES/EMPRESAS

//usuarios y repartidores
export const query4 = async (req, res) =>{
    var query = conn.query(
        'SELECT * FROM Usuario WHERE (Estado = "0" or Estado = "2") and id_rol=2;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err      
            res.send(result)     //envio contenido en la tabla
        }
    )
}


//APROBAR SOLICITUDES DE USUARIO/REPARTIDORES/EMPRESAS

//usuarios y repartidores
export const query6 = async (req, res) =>{
    console.log(req.body)
    var query = conn.query(//ojo con los tipos de campos en este caso telefono es varchar y el id entero
        `UPDATE Usuario SET Estado = "1" WHERE id_usuario = ${req.body.id_usuario} ;`,
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err 
            console.log(result.affectedRows)   
            
            
            //envio correo-------------------------------------------------------------
            //gmail ======================================================
            var transporter = createTransport({//cuenta de la empresa ImdbX
                host: 'smtp.gmail.com',
                post: 465,
                secure: true,
                auth: {
                    user: 'alchilazo.grupo6@gmail.com',
                    pass: 'einappdihxiwddvv'// contrasenya generada por google
                },
            });

            //creacion del esquema del correo a enviar
            var mailOptions = {
                from: "AlChilazoTeam",
                to: req.body.Correo,
                subject: "[AlChilazo] Creacion de cuenta sastifactoriamente",
                text: "Se le informa estimad@ repartidor" + ",que la creacion de cuenta en AlChilazo se ha realizado con exito.\n" +
                    "Puede visitar y utilizar las funciones del sitio."+ "\nAtentamente AlChilazoTeam."
            }

            //envio de correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send(error.message) //desactivar antivirus, si este error sale: self signed certificate in certificate chain
                } else {//todo ok
                    console.log("email enviado")
                    res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
                }

            });
            //--------------------------------------------------------------------------
            //res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
        }
    )
}


//usuarios y repartidores rechazo
export const query99 = async (req, res) =>{
    console.log(req.body)
    var query = conn.query(//ojo con los tipos de campos en este caso telefono es varchar y el id entero
        `UPDATE Usuario SET Estado = "2" WHERE id_usuario = ${req.body.id_usuario} ;`,
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err 
            console.log(result.affectedRows)   
            
            
            //envio correo-------------------------------------------------------------
            //gmail ======================================================
            var transporter = createTransport({//cuenta de la empresa ImdbX
                host: 'smtp.gmail.com',
                post: 465,
                secure: true,
                auth: {
                    user: 'alchilazo.grupo6@gmail.com',
                    pass: 'einappdihxiwddvv'// contrasenya generada por google
                },
            });

            //creacion del esquema del correo a enviar
            var mailOptions = {
                from: "AlChilazoTeam",
                to: req.body.Correo,
                subject: "[AlChilazo] Creacion de cuenta denegada",
                text: "Se le informa estimad@ repartidor" + ",que la creacion de cuenta en AlChilazo se ha denegado.\n" +
                    "Esto debido a violacion de politica interna o por brindar informacion fraudulenta."+ "\nAtentamente AlChilazoTeam."
            }

            //envio de correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send(error.message) //desactivar antivirus, si este error sale: self signed certificate in certificate chain
                } else {//todo ok
                    console.log("email enviado")
                    res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
                }

            });
            //--------------------------------------------------------------------------
            //res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
        }
    )
}
