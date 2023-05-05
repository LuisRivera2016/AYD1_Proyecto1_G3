import { Router } from "express";
import { query1, query3 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/createProducto", query3);

export default router;
