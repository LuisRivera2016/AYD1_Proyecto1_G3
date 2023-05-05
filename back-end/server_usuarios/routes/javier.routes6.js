import { Router } from "express";
import { query6 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/ActivarUsuario", query6);

export default router;
