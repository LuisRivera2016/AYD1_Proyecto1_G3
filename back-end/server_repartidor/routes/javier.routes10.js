import { Router } from "express";
import { query99 } from "../controllers/javier.controllers1R.js"
const router = Router();

//Rutas van aqui ----------
router.post("/RechazarUsuarioR", query99);

export default router;
