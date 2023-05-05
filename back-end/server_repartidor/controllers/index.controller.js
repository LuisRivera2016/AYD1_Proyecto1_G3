import {pool} from "../config/db.js";

export const index = (req, res) => res.json(
    { message: "Bienvenido a mi api" }
);

export const pingdb = async (req, res) => {
    try{
        const [Select] = await pool.query(`SELECT 'ping' as result;`);

        return res.status(200).json({mensaje: Select[0].result});
    }
    catch(error){
        return res.status(500).json({mensaje: "Algo ha salido mal"});
    }
}