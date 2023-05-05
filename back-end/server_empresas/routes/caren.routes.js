import { Router } from "express";
import { query0 } from "../controllers/caren.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/RegistarEmpresa", query0);

export default router;
