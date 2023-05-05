import { Router } from "express";
import { query1, query5 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getEmpresaEnEspera", query5);

export default router;
