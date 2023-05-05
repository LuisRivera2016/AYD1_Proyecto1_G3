import { Router } from "express";
import { query0 } from "../controllers/luis.controllers.js"
import { query1 } from "../controllers/luis.controllers.js"
import { query2 } from "../controllers/luis.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/historialPedidoRepartidor", query0);
router.post("/listaSolicitudes", query1);
router.post("/listaPedidosAsignados", query2);

export default router;