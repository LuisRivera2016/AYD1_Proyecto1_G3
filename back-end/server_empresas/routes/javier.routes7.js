import { Router } from "express";
import { query1, query7 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/ActivarEmpresa", query7);

export default router;
