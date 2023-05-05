import {pool} from "../config/db.js"

export const index = (req, res) => res.json({ message: "Welcome to my api" });

export const ping = async (req, res) => {
    const [result] = await pool.query('SELECT "ping" as result');
    res.json(result[0]);
};