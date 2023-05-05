import { Router } from "express";
import { query0 } from "../controllers/luis.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/historialPedidoUsuario", query0);

export default router;