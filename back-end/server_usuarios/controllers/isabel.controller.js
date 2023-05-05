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

export const userDisable = async (req, res) => {
  const { idUsuario } = req.body;
  executeQuery(
    `UPDATE Usuario SET estado = '3' WHERE id_usuario = ${idUsuario};`
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

export const getUsers = async (req, res) => {

  executeQuery(
    'SELECT * FROM Usuario WHERE (Estado = "0") or (Estado = "1") and id_rol=1;'
  )
    .then((results) => {
      res.send(results)
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

export const getRepartidor = async (req, res) => {

  executeQuery(
    'SELECT * FROM Usuario WHERE (Estado = "0" or Estado = "1") and id_rol=2;'
  )
    .then((results) => {
      res.send(results)
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

export const companyDisable = async (req, res) => {
  const { idEmpresa } = req.body;
  executeQuery(
    `UPDATE Empresa SET estado = '3' WHERE id_usuario = ${idEmpresa};`
  )
    .then((results) => {
      if (results.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Empresa deshabilitada exitosamente!" });
      } else {
        res
          .status(400)
          .json({
            message:
              "Ocurrió un error al deshabilitar una empresa. Intenta de nuevo.",
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

export const getCompany = async (req, res) => {

  executeQuery(
    'SELECT * FROM Empresa WHERE (Estado = "0") or (Estado = "1");'
  )
    .then((results) => {
      res.send(results)
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
