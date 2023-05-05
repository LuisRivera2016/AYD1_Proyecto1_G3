import { config } from "dotenv";
import { createPool } from "mysql2/promise";

config();

// Base de datos
export const DB_HOST = process.env.DB_HOST || "practica2-analisis1.cfyrsysd3ere.us-east-1.rds.amazonaws.com";
export const DB_USER = process.env.DB_USER || "admin";
export const DB_PASSWORD = process.env.DB_PASSWORD || "analisis1234";
export const DB_DATABASE = process.env.DB_DATABASE || "Analisis1_P1";
export const DB_PORT = process.env.DB_PORT || 3306;


export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
});