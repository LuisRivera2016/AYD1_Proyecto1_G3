//query post-mysql
import {createTransport } from "nodemailer";

import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
  } from "../config/config.js";

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


//obtener lista de categorias de una empresa en especifico
export const query1 = async (req, res) =>{
    var query = conn.query(
        `select * from Categoria ;`,
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            console.log(result.affectedRows)       
            res.send(result)     //envio contenido en la tabla
        }
    )
}

//crear categoria(PROHIBIDA)
/*
export const query2 = async (req, res) =>{
    console.log(req.body)
    //inserto en mysql
    var query = conn.query(
        `INSERT INTO CategoriaProducto(Nombre,idEmpresa) VALUES ('${req.body.Nombre}', ${req.body.idEmpresa}    );`,
        function (err, result) {
            if (err) throw err
            console.log(result.affectedRows)     
            res.send({"guardado":result.affectedRows})     //envio contenido en la tabla
        })
}
*/

//PANEL DE CONTROL DE EMPRESAS(crear producto)
export const query3 = async (req, res) =>{
    console.log(req.body)
    //inserto en mysql
    var query = conn.query(
        `INSERT INTO Producto(Nombre,Foto,Descripcion,Precio,id_categoria,id_empresa) VALUES ('${req.body.Nombre}', '${req.body.Foto}', '${req.body.Descripcion}', ${req.body.Precio}, ${req.body.id_categoria}, ${req.body.id_empresa}     );`,
        function (err, result) {
            if (err) throw err
            console.log(result.affectedRows)     
            res.send({"guardado":result.affectedRows})     //envio contenido en la tabla
        })
}

//PANEL DE CONTROL DE EMPRESAS(actualizar/modificar producto)
export const query33 = async (req, res) =>{
    console.log(req.body)
    //inserto en mysql
    var query = conn.query(
        `UPDATE Producto
        SET nombre = "${req.body.Nombre}", 
        descripcion ="${req.body.Descripcion}",
        foto="${req.body.Foto}",
        precio=${req.body.Precio},
        id_categoria=${req.body.id_categoria}
        WHERE id_producto = ${req.body.id_producto};`,
        function (err, result) {
            if (err) throw err
            console.log(result.affectedRows)     
            res.send({"guardado":result.affectedRows})     //envio contenido en la tabla
        })
}

//obtener lista de productos de una empresa en especifico
export const query13 = async (req, res) =>{
    var query = conn.query(
        `select * from Producto where id_empresa=${req.body.id_empresa} ;`,
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            console.log(result.affectedRows)       
            res.send(result)     //envio contenido en la tabla
        }
    )
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//LISTADO DE SOLICITUDES DE CREACION DE USUARIO/REPARTIDORES/EMPRESAS

//empresas
export const query5 = async (req, res) =>{
    var query = conn.query(
        'SELECT * FROM Empresa join Documento on Documento.id_empresa = Empresa.id_empresa join TipoEmpresa on TipoEmpresa.id_tipo_empresa = Empresa.id_tipo_empresa  WHERE Empresa.Estado = "0" or Empresa.Estado = "2";',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err      
            res.send(result)     //envio contenido en la tabla
        }
    )
}

//APROBAR SOLICITUDES DE USUARIO/REPARTIDORES/EMPRESAS

//empresas
export const query7 = async (req, res) =>{
    console.log(req.body)
    var query = conn.query(//ojo con los tipos de campos en este caso telefono es varchar y el id entero
        `UPDATE Empresa SET Estado = "1" WHERE id_empresa = ${req.body.id_empresa} ;`,
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
                text: "Se le informa estimad@ empresa" + ",que la creacion de cuenta en AlChilazo se ha realizado con exito.\n" +
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


//empresas denegada
export const query99 = async (req, res) =>{
    console.log(req.body)
    var query = conn.query(//ojo con los tipos de campos en este caso telefono es varchar y el id entero
        `UPDATE Empresa SET Estado = "2" WHERE id_empresa = ${req.body.id_empresa} ;`,
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
                text: "Se le informa estimad@ empresa" + ",que la creacion de cuenta en AlChilazo se ha denegado.\n" +
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