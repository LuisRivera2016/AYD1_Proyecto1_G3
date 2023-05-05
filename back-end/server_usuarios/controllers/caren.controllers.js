import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "../config/config.js";

import { createConnection } from "mysql";
import fs from 'fs';

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

//registrar usuario y repartidores en mysql
export const query0 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT id_usuario FROM Usuario where correo='${req.body.Correo}' ;`,
            async function (err, result) {    
                if (err) throw err
                if (result.length > 0) {
                    console.log("YA EXISTE en DB el usuario, reintente con otro correo!")
                    res.send({ "guardado": false })

                } else {
                    console.log(req.body)
                    /*const base64Data = req.body.base64;
                    const buffer = Buffer.from(base64Data, 'base64');

                    fs.writeFile(`../assets/${req.body.UrlCv.substring(req.body.UrlCv.lastIndexOf('\\') + 1)}`, buffer, (error) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send({message: 'Error al guardar el CV'})
                        }
                    })*/
                    //inserto en mysql
                    var query = conn.query(
                        `INSERT INTO Usuario(nombre,apellido,correo,telefono,password,estado,url_cv,tipo_licencia,vehiculo,id_municipio,id_rol) VALUES ('${req.body.Nombre}','${req.body.Apellido}','${req.body.Correo}','${req.body.Telefono}','${req.body.Contrasena}', '${req.body.Estado}','${req.body.UrlCv}','${req.body.TipoLicencia}','${req.body.Vehiculo}','${req.body.IdMunicipio}','${req.body.idRol}');`,
                        function (err, result) {
                            if (err) throw err
                            console.log(result.affectedRows)
                            res.send({ "guardado": true })    //envio contenido en la tabla
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

//Endpoints para navegar entre categorias

//Obtener entre categorias para mostrarlas en el lobby principal, ejemplo: comida, ropa, hamburguesas, postres, pizzas etc
export const query1 = async (req, res) => {
    try {
        console.log(req.body)
        //obtener categorias
        var query1 = conn.query(
            `SELECT id_categoria, nombre FROM Categoria;`,
            function (err, result) {    
                if (err) throw err
                if (result.length > 0) {
                    console.log("Categorias Disponibles")
                    res.send({ "datos": result})
                } else {
                    console.log("Error al obtener categorias")
                         
                    
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "guardado": false })
    }
}

// Obtener las empresas de una categoria, por ejemplo para hamburguesas aparecerian McDonalds, Burger King, etc
export const query2 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT E.id_empresa, E.nombre FROM Empresa E 
            INNER JOIN Producto P ON P.id_empresa = E.id_empresa
            INNER JOIN Categoria C ON C.id_categoria = P.id_categoria
            WHERE C.id_categoria = '${req.body.IdCategoria}';`,
            function (err, result) {    
                if (err) throw err
                if (result.length > 0) {
                    console.log("Categorias Disponibles")
                    res.send(result)
                } else {
                            console.log("Error al obtener empresas de la categoria")
                    
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "guardado": false })
    }
}


// Obtener las empresas de una categoria, por ejemplo para hamburguesas aparecerian McDonalds, Burger King, etc
export const query3 = async (req, res) => {
    try {
        console.log(req.body)
        var query1 = conn.query(
            `SELECT id_producto, id_categoria, nombre, descripcion,foto,precio FROM Producto WHERE id_empresa = '${req.body.idEmpresa}';`,
            function (err, result) {    
                if (err) throw err
                if (result.length > 0) {
                    console.log("Poductos Disponibles")
                    res.send({ "Productos": result})
                } else {
                            console.log("Error al obtener empresas de la categoria")
                    
                }
            }
        )


    } catch (error) {
        console.log(error)
        return res.send({ "guardado": false })
    }
}

//aceptar pedido de un carrito 

export const query4 = async (req, res) => {
    try {
        console.log(req.body)
        const pedido = req.body
        var query1 = conn.query(
            `INSERT INTO Pedido (estado, fecha, instrucciones, direccion,calificacion, id_municipio, id_usuario, id_repartidor, id_tarjeta)
             VALUES ('${pedido.Estado}', CURDATE(), '${pedido.Instrucciones}', '${pedido.Direccion}', '${pedido.Calificacion}', ${pedido.IdMunicipio}, ${pedido.IdUsuario}, ${pedido.IdRepartidor}, ${pedido.IdTarjeta})`,
            function (err, result) {    
                if (err) throw err
                console.log("Pedido insertado correctamente")
                const pedidoId = result.insertId
                const productos = pedido.productos
                productos.forEach(producto => {
                    conn.query(
                        `INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, personalizacion)
                         VALUES (${pedidoId}, ${producto.IdProducto}, ${producto.Cantidad}, '${producto.Personalizacion}')`,
                        function (err, result) {    
                            if (err) throw err
                            console.log(`Producto ${producto.IdProducto} insertado correctamente en detalle_pedido`)
                        }
                    )
                })
                res.send({ "guardado": true })
            }
        )
    } catch (error) {
        console.log(error)
        return res.send({ "guardado": false })
    }
}

export const query5 = async (req, res) => {
    try {
        var query1 = conn.query(
            `SELECT * FROM  Departamento;`,
            function (err, result) {    
                if (err) throw err
                console.log("Departamentos devueltos")
                res.send(result)
            }
        )
    } catch (error) {
        console.log(error)
        return res.send({ "Error": error })
    }
}

export const query6 = async (req, res) => {
    try {
        const id_depto = req.body.id_depto
        var query1 = conn.query(
            `SELECT id_municipio, nombre FROM  Municipio WHERE id_departamento = ${id_depto};`,
            function (err, result) {    
                if (err) throw err
                console.log("Municipios devueltos")
                res.send(result)
            }
        )
    } catch (error) {
        console.log(error)
        return res.send({ "Error": error })
    }
}
