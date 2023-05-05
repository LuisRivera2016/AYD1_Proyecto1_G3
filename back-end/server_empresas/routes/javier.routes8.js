import { Router } from "express";
import { query1, query33 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/actualizarProducto", query33);

export default router;
