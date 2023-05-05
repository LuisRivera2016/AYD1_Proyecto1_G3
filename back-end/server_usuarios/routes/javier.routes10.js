import { Router } from "express";
import { query99 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/RechazarUsuario", query99);

export default router;
