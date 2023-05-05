import { Router } from "express";
import { query4 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getUsuariosEnEspera", query4);

export default router;
