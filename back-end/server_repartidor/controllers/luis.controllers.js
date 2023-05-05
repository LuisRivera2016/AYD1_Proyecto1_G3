//query post-mysql
//import {createTransport } from "nodemailer";

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


//obtener historial de pedidos de usuario
export const query0 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT Pedido.Estado,Pedido.calificacion,Pedido.fecha,Producto.nombre,Producto.descripcion,Producto.foto,Producto.precio FROM Pedido
            INNER JOIN Usuario ON Usuario.id_Usuario=Pedido.id_repartidor
            INNER JOIN Detalle_Pedido ON Pedido.id_pedido = Detalle_Pedido.id_pedido
            INNER JOIN Producto ON Detalle_Pedido.id_producto = Producto.id_producto
            INNER JOIN Rol ON Usuario.id_rol = Rol.id_rol
            WHERE Pedido.id_repartidor = ${req.body.idRepartidor} AND Rol.nombre = "Repartidor";`,
            function (err, result) {    
                if (err) throw err

                console.log("Error: " + err)

                if (result.length > 0) {
                    console.log(result);
                    res.send({Pedidos:result});
                } else {
                    console.log("No tiene pedidos")
                    res.send({ "message": "El Repartidor no tiene pedidos realizados" })
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "pedidos": false })
    }
}


//obtener lista de pedidos para repartir
export const query1 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT Municipio.nombre,Pedido.direccion,Pedido.fecha,Pedido.instrucciones,Producto.nombre,Producto.descripcion,Producto.foto,Producto.precio,Categoria.nombre,Empresa.nombre,Empresa.telefono,Empresa.direccion FROM Pedido
            INNER JOIN Usuario ON Usuario.id_usuario=Pedido.id_repartidor
            INNER JOIN Detalle_Pedido ON Pedido.id_pedido = Detalle_Pedido.id_pedido
            INNER JOIN Producto ON Detalle_Pedido.id_producto = Producto.id_producto
            INNER JOIN Empresa ON Producto.id_empresa = Empresa.id_empresa
            INNER JOIN Categoria ON Producto.id_categoria = Categoria.id_categoria
            INNER JOIN Municipio ON Pedido.id_municipio = Municipio.id_municipio
            WHERE Pedido.estado = "2" AND Pedido.id_municipio = (SELECT id_municipio FROM Usuario WHERE id_usuario = ${req.body.idRepartidor});  `,
            function (err, result) {    
                if (err) throw err

                console.log("Error: " + err)

                if (result.length > 0) {
                    console.log(result);
                    res.send({Pedidos:result});
                } else {
                    console.log("No tiene pedidos")
                    res.send({ "message": "No hay pedidos para seleccionar" })
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "pedidos": false })
    }
}


//obtener lista de pedidos Asignados 
export const query2 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT Municipio.nombre,Pedido.direccion,Pedido.fecha,Pedido.instrucciones,Producto.nombre,Producto.descripcion,Producto.foto,Producto.precio,Categoria.nombre,Empresa.nombre,Empresa.telefono,Empresa.direccion FROM Pedido
            INNER JOIN Usuario ON Usuario.id_usuario=Pedido.id_repartidor
            INNER JOIN Detalle_Pedido ON Pedido.id_pedido = Detalle_Pedido.id_pedido
            INNER JOIN Producto ON Detalle_Pedido.id_producto = Producto.id_producto
            INNER JOIN Empresa ON Producto.id_empresa = Empresa.id_empresa
            INNER JOIN Categoria ON Producto.id_categoria = Categoria.id_categoria
            INNER JOIN Municipio ON Pedido.id_municipio = Municipio.id_municipio
            WHERE Pedido.estado = "3" AND Pedido.id_municipio = (SELECT id_municipio FROM Usuario WHERE id_usuario = ${req.body.idRepartidor}) AND Pedido.id_repartidor = ${req.body.idRepartidor}; `,
            function (err, result) {    
                if (err) throw err

                console.log("Error: " + err)

                if (result.length > 0) {
                    console.log(result);
                    res.send({Pedidos:result});
                } else {
                    console.log("No tiene pedidos")
                    res.send({ "message": "No hay pedido Asignado" })
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "pedidos": false })
    }
}