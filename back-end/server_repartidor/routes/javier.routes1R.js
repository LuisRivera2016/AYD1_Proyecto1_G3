import { Router } from "express";
import { query4 } from "../controllers/javier.controllers1R.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getUsuariosEnEsperaR", query4);

export default router;
