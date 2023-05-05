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
}

export const addCategoryProduct = async (req, res) => {
  executeQuery(`INSERT INTO Categoria (nombre) 
    SELECT '${req.body.categoria}'
    WHERE NOT EXISTS (
        SELECT 1 FROM Categoria WHERE UPPER(nombre) = UPPER('${req.body.categoria}')
    );`)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Categoría agregada exitosamente!" });
      } else {
        res.status(400).json({"message":`Ya existe la categoría ${req.body.categoria}`})
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
}