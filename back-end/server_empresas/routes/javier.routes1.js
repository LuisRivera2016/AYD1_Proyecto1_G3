import { Router } from "express";
import { query1 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getCategoriaProducto", query1);

export default router;
