//query post-mysql
import { createTransport } from "nodemailer";

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



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//LISTADO DE SOLICITUDES DE CREACION DE USUARIO/REPARTIDORES/EMPRESAS

//usuarios y repartidores
export const query4 = async (req, res) => {
    var query = conn.query(
        'SELECT * FROM Usuario WHERE (Estado = "0" or Estado = "2") and id_rol=1;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            res.send(result)     //envio contenido en la tabla
        }
    )
}


//APROBAR SOLICITUDES DE USUARIO/REPARTIDORES/EMPRESAS

//usuarios y repartidores
export const query6 = async (req, res) => {
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
                text: "Se le informa estimad@ usuario" + ",que la creacion de cuenta en AlChilazo se ha realizado con exito.\n" +
                    "Puede visitar y utilizar las funciones del sitio." + "\nAtentamente AlChilazoTeam."
            }

            //envio de correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send(error.message) //desactivar antivirus, si este error sale: self signed certificate in certificate chain
                } else {//todo ok
                    console.log("email enviado")
                    res.send({ "afectado": result.affectedRows })     //envio contenido en la tabla
                }

            });
            //--------------------------------------------------------------------------
            //res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
        }
    )
}


//usuarios y repartidores rechazo
export const query99 = async (req, res) => {
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
                text: "Se le informa estimad@ usuario" + ",que la creacion de cuenta en AlChilazo se ha denegado.\n" +
                    "Esto debido a violacion de politica interna o por brindar informacion fraudulenta." + "\nAtentamente AlChilazoTeam."
            }

            //envio de correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send(error.message) //desactivar antivirus, si este error sale: self signed certificate in certificate chain
                } else {//todo ok
                    console.log("email enviado")
                    res.send({ "afectado": result.affectedRows })     //envio contenido en la tabla
                }

            });
            //--------------------------------------------------------------------------
            //res.send({"afectado":result.affectedRows})     //envio contenido en la tabla
        }
    )
}



//proyecto 2-----------------------

export const query100 = async (req, res) => {

    var consulta1;
    var consulta2;
    var consulta3;
    var consulta4;
    var consulta5;

    //consulta 1(total de pedidos hechos en el sistema)--------------------------------------------------------------------------------------------
    var query = conn.query(
        'select count(*) as NumPedidosTotales from Detalle_Pedido;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            //res.send(result)     //envio contenido en la tabla
            console.log("1:" + result)
            consulta1 = result

            //consulta 2(total de pedidos por empresa)-------------------------------------------------------------------------------------
            var query = conn.query(
                `select Empresa.nombre, count(Empresa.id_empresa) as total from Detalle_Pedido 
                join Producto on Producto.id_producto = Detalle_Pedido.id_producto
                join Empresa on Empresa.id_empresa = Producto.id_empresa
                group by Empresa.nombre,Empresa.id_empresa;`,
                function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                    if (err) throw err
                    //res.send(result)     //envio contenido en la tabla
                    console.log("2:" + result)
                    consulta2 = result

                    //consulta 3(valor de las ventas)-------------------------------------------------------------------------------------
                    var query = conn.query(
                        `select Empresa.nombre, sum(Producto.precio *Detalle_Pedido.cantidad) as ValorVentas  from Detalle_Pedido 
                        join Producto on Producto.id_producto = Detalle_Pedido.id_producto
                        join Empresa on Empresa.id_empresa = Producto.id_empresa
                        group by Empresa.nombre;`,
                        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                            if (err) throw err
                            //res.send(result)     //envio contenido en la tabla
                            console.log("3:" + result)
                            consulta3 = result

                            //consulta 4(top productos mas vendidos)-------------------------------------------------------------------------------------
                            var query = conn.query(
                                `SELECT Producto.nombre as producto, COUNT(Producto.id_producto) AS vecesVendidos,Empresa.nombre
                                FROM Detalle_Pedido 
                                JOIN Producto ON Producto.id_producto = Detalle_Pedido.id_producto
                                JOIN Empresa ON Empresa.id_empresa = Producto.id_empresa
                                GROUP BY Producto.nombre,Producto.id_producto,Empresa.nombre
                                ORDER BY vecesVendidos DESC
                                LIMIT 10;`,
                                function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                    if (err) throw err
                                    //res.send(result)     //envio contenido en la tabla
                                    console.log("4:" + result)
                                    consulta4 = result

                                    //consulta 5(top restaurantes con mayor desempenyo)-------------------------------------------------------------------------------------
                                    var query = conn.query(
                                        `SELECT Empresa.nombre, COUNT(Empresa.id_empresa) AS NumPedidos, Municipio.nombre as municipio,Departamento.nombre as departamento, Empresa.direccion as direccion
                                        FROM Detalle_Pedido 
                                        JOIN Producto ON Producto.id_producto = Detalle_Pedido.id_producto
                                        JOIN Empresa ON Empresa.id_empresa = Producto.id_empresa
                                        Join Municipio on Municipio.id_municipio =Empresa.id_municipio
                                        Join Departamento on Departamento.id_departamento =Municipio.id_departamento
                                        GROUP BY Empresa.nombre, Empresa.id_empresa, Municipio.nombre,Departamento.nombre,Empresa.direccion
                                        ORDER BY NumPedidos DESC
                                        LIMIT 10;`,
                                        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                            if (err) throw err
                                            //res.send(result)     //envio contenido en la tabla
                                            console.log("5:" + result)
                                            consulta5 = result


                                            //como ya tengo TODAS las consultas envio mi obj
                                            res.json({ cons1: consulta1, cons2: consulta2, cons3: consulta3, cons4: consulta4, cons5: consulta5 })


                                        }
                                    )


                                }
                            )


                        }
                    )


                }
            )
        }
    )

}


export const query101 = async (req, res) => {

    var consulta1;
    var consulta2;
    var consulta3;
    var consulta4;
    var consulta5;
    var consulta6;
    var consulta7;

    //consulta 1(total de usuarios normales)--------------------------------------------------------------------------------------------
    var query = conn.query(
        'select count(*) as NumUsuariosTotales from Usuario where id_rol=1;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            //res.send(result)     //envio contenido en la tabla
            console.log("1:" + result)
            consulta1 = result

            //consulta 2(total de repartidores)-------------------------------------------------------------------------------------
            var query = conn.query(
                `select count(*) as NumRepartidores from Usuario
                where id_rol=2;`,
                function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                    if (err) throw err
                    //res.send(result)     //envio contenido en la tabla
                    console.log("2:" + result)
                    consulta2 = result

                    //consulta 3(total de empresas)-------------------------------------------------------------------------------------
                    var query = conn.query(
                        `select count(*) as NumEmpresa from Usuario
                        where id_rol=3;`,
                        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                            if (err) throw err
                            //res.send(result)     //envio contenido en la tabla
                            console.log("3:" + result)
                            consulta3 = result

                            //consulta 4(total usuarios activos)-------------------------------------------------------------------------------------
                            var query = conn.query(
                                `select count(*) as usuariosActivos from Usuario
                                where estado=1;`,
                                function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                    if (err) throw err
                                    //res.send(result)     //envio contenido en la tabla
                                    console.log("4:" + result)
                                    consulta4 = result

                                    //consulta 5(listado de usuarios activos)-------------------------------------------------------------------------------------
                                    var query = conn.query(
                                        `select * from Usuario 
                                        where estado=1;`,
                                        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                            if (err) throw err
                                            //res.send(result)     //envio contenido en la tabla
                                            console.log("5:" + result)
                                            consulta5 = result

                                            //consulta 6(total de usuarios nuevos)-------------------------------------------------------------------------------------
                                            var query = conn.query(
                                                `select count(*) as NuevosUsuarios from Usuario 
                                                where estado=0;`,
                                                function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                                    if (err) throw err
                                                    //res.send(result)     //envio contenido en la tabla
                                                    console.log("6:" + result)
                                                    consulta6 = result


                                                    //consulta 7(listado de usuarios nuevos)-------------------------------------------------------------------------------------
                                                    var query = conn.query(
                                                        `select * from Usuario
                                                        where estado=0;`,
                                                        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
                                                            if (err) throw err
                                                            //res.send(result)     //envio contenido en la tabla
                                                            console.log("7:" + result)
                                                            consulta7 = result


                                                            //como ya tengo TODAS las consultas envio mi obj
                                                            res.json({ cons1: consulta1, cons2: consulta2, cons3: consulta3, cons4: consulta4, cons5: consulta5, cons6: consulta6, cons7: consulta7 })


                                                        }
                                                    )


                                                }
                                            )





                                        }
                                    )


                                }
                            )


                        }
                    )


                }
            )
        }
    )

}

export const query102 = async (req, res) => {

    var consulta1;


    //consulta 1(total de pedidos entregados por repartidor)--------------------------------------------------------------------------------------------
    var query = conn.query(
        `select Usuario.nombre ,avg(Pedido.calificacion) as calificacionRepartidor ,count(Usuario.nombre ) as PedidosRealizados,sum(Producto.precio *Detalle_Pedido.cantidad) as GananciasTotalesEmpresa,0.05*sum(Producto.precio *Detalle_Pedido.cantidad) as GananciasRepartidor from Detalle_Pedido 
        join Producto on Producto.id_producto = Detalle_Pedido.id_producto
        join Pedido on Pedido.id_pedido = Detalle_Pedido.id_pedido
        join Usuario on Usuario.id_usuario  = Pedido.id_repartidor
        group by Usuario.nombre`,
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla
            if (err) throw err
            //res.send(result)     //envio contenido en la tabla
            console.log("1:" + result)
            consulta1 = result

            //como ya tengo TODAS las consultas envio mi obj
            res.json({ cons1: consulta1 })


           
        }
    )

}
