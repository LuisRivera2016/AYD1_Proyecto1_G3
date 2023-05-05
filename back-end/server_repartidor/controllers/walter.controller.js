import {pool} from "../config/db.js";


export const ingresarSolicitud = async (req, res) =>{
    let result = {
        mensaje: "",
        insertado: false
    }

    try{
        const {id_repartidor, motivo, id_municipio} = req.body;

        const [verifSolicitud] = await pool.query(
            `SELECT Count(id_solicitud) as result FROM SolicitudCambio
            WHERE id_usuario = ${id_repartidor} and Estado = 1;`
            );


        if (verifSolicitud[0].result > 0){
            result.mensaje = "Ya ha solicitado un cambio de zona anterior mente."
            return res.status(200).json(result);
        }


        await pool.query(
            `INSERT INTO SolicitudCambio (motivo, estado, id_municipio, id_usuario)
            VALUES ('${motivo}', 1, ${id_municipio}, ${id_repartidor});`
            );

        result.mensaje = "Solicitud enviada correctamente"
        result.insertado = true
        return res.status(200).json(result);
    }
    catch (error) {//Error si algo sale mal
        console.log(error)
        result.mensaje = "Algo ha salido mal"
        return res.status(500).json(result);
    }
}


export const getCalificacion = async (req, res) =>{
    let result = {
        mensaje: "",
        calificacion: -1
    }

    try{
        const {id_repartidor} = req.body;

        const [Select] = await pool.query(
            `SELECT AVG(calificacion) as promedio FROM Pedido
            WHERE id_repartidor = ${id_repartidor} and estado = 4;`
            );

        if (Select[0].promedio == null){
            result.mensaje = "El repartidor no ha obtenido ninguna calificación."
            return res.status(200).json(result);
        }

        result.mensaje = "Calificacion obtenida correctamente"
        return res.status(200).json(result);
    }
    catch (error) {//Error si algo sale mal
        console.log(error)
        result.mensaje = "Algo ha salido mal"
        return res.status(500).json(result);
    }
}


export const getDatos = async (req, res) =>{
    let result = {
        mensaje: "",
        data: []
    }

    try{
        const {id_repartidor} = req.body;

        const [Select] = await pool.query(
            `SELECT 
            usr.nombre, usr.apellido, usr.correo, usr.telefono, usr.url_cv, 
            usr.tipo_licencia, usr.vehiculo, mun.nombre as municipio, dep.nombre as departamento
            FROM Usuario usr
            Inner Join Municipio mun on mun.id_municipio = usr.id_municipio
            Inner Join Departamento dep on dep.id_departamento = mun.id_municipio
            Where usr.id_usuario = ${id_repartidor} and usr.id_rol = 2
            ;`);


        result.mensaje = "Información obtenida correctamente"
        result.data = Select[0]
        return res.status(200).json(result);
    }
    catch (error) {//Error si algo sale mal
        console.log(error)
        result.mensaje = "Algo ha salido mal"
        return res.status(500).json(result);
    }
}


export const getComisionTotal = async (req, res) =>{
    let result = {
        mensaje: "",
        data: []
    }

    try{
        const {id_repartidor} = req.body;

        const [Select] = await pool.query(
            `SELECT SUM(pr.precio * dp.cantidad * 0.05) as comision
            FROM Pedido pe 
            Inner Join Detalle_Pedido dp on dp.id_pedido = pe.id_pedido
            Inner Join Producto pr on pr.id_producto = dp.id_producto
            Where pe.id_repartidor = ${id_repartidor}
            ;`);


        result.mensaje = "Información obtenida correctamente"
        result.data = Select[0]
        return res.status(200).json(result);
    }
    catch (error) {//Error si algo sale mal
        console.log(error)
        result.mensaje = "Algo ha salido mal"
        return res.status(500).json(result);
    }
}