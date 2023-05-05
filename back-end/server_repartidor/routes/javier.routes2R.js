import { Router } from "express";
import { query6 } from "../controllers/javier.controllers1R.js"
const router = Router();

//Rutas van aqui ----------
router.post("/ActivarUsuarioR", query6);

export default router;
