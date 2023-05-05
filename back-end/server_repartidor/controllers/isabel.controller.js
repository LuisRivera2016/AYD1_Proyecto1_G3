import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
  } from "../config/config.js";
  import mysql from "mysql2/promise";
  
  async function executeQuery(sql) {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: DB_PORT,
    });
    const [rows, _] = await connection.execute(sql);
    connection.end();
  
    return rows;
  };
  
  export const orderStatusChange = async (req, res) => {
    const { idPedido, estado } = req.body;
    executeQuery(
      `UPDATE Pedido SET estado = '${estado}' WHERE id_pedido = ${idPedido};`
    )
      .then((results) => {
        if (results.affectedRows > 0) {
          res
            .status(200)
            .json({ message: "Usuario deshabilitado exitosamente!" });
        } else {
          res
            .status(400)
            .json({
              message:
                "Ocurrió un error al deshabilitar un usuario. Intenta de nuevo.",
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  };