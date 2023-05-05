
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "../config/config.js";

import { createConnection } from "mysql";

var conn = createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

conn.connect(function (err) {
    if (err) throw err
    console.log("Conexion a mysql!")

})

//registrar empresa
export const query0 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT id_empresa FROM Empresa where nombre='${req.body.Nombre}' ;`,
            function (err, result) {    
                if (err) throw err

                if (result.length > 0) {
                    console.log("YA EXISTE en DB la Empresa, reintente con otro nombre!")
                    res.send({ "guardado": false })

                } else {
                    //inserto en mysql
                    var query = conn.query(
                        `INSERT INTO Empresa(nombre,descripcion,correo,password,telefono,direccion,estado,id_municipio, id_tipo_empresa) VALUES ('${req.body.Nombre}','${req.body.Descripcion}', '${req.body.Correo}', '${req.body.Contrasena}', '${req.body.Telefono}', '${req.body.Direccion}','${req.body.Estado}','${req.body.IdMunicipio}','${req.body.IdTipoEmpresa}');`,
                        function (err, result) {
                            if (err) throw err
                            console.log(result.affectedRows)
                            console.log("se inserto en la tabla empresa")
                        }
                    )
                    //obtenemos el id de esa empresa para insertar en la tabla de documento
                    var query = conn.query(//                                                                                                           Nombre,Director,Resumen,duracion,clasificacion,imagen,trailer,Estreno
                        `SELECT id_empresa FROM Empresa where nombre='${req.body.Nombre}' ;`,
                        function (err, result) {
                            if (err) throw err
                            if (result.length > 0) {
                                console.log("si existe la empresa")
                                //inserto en mysql
                                var query = conn.query(
                                    `INSERT INTO Documento(nombre,url_documento,fecha_actualizacion,id_empresa) VALUES ('${req.body.NombreDoc}','${req.body.UrlDocumento}',CURDATE(),'${result[0].id_empresa}');`,
                                    function (err, result) {
                                        if (err) throw err
                                        console.log(result.affectedRows)
                                        console.log("se inserto en la tabla documento")
                                        res.send({ "guardado": true })    //envio contenido en la tabla
                                    }
                                )
                            }

                        }
                    )
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "guardado": false })
    }
}
