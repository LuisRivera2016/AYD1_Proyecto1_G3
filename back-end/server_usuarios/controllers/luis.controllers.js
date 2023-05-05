//query post-mysql
//import {createTransport } from "nodemailer";

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


//obtener historial de pedidos de usuario
export const query0 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT Pedido.Estado,Pedido.calificacion,Pedido.fecha,Producto.nombre,Producto.descripcion,Producto.foto,Producto.precio,Empresa.nombre,Empresa.telefono FROM Pedido
            INNER JOIN Usuario ON Usuario.id_Usuario=Pedido.id_usuario
            INNER JOIN Detalle_Pedido ON Pedido.id_pedido = Detalle_Pedido.id_pedido
            INNER JOIN Producto ON Detalle_Pedido.id_producto = Producto.id_producto
            INNER JOIN Empresa ON Producto.id_empresa = Empresa.id_empresa
            INNER JOIN Rol ON Usuario.id_rol = Rol.id_rol
            WHERE Pedido.id_usuario = ${req.body.idUsuario} AND Rol.nombre = "Usuario";`,
            function (err, result) {    
                if (err) throw err

                console.log("Error: " + err)

                if (result.length > 0) {
                    console.log(result);
                    res.send({Pedidos:result});
                } else {
                    console.log("No tiene pedidos")
                    res.send({ "message": "El usuario no ha realizado pedidos" })
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "pedidos": false })
    }
}