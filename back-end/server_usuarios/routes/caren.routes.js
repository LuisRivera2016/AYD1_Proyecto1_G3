import { Router } from "express";
import { query0 } from "../controllers/caren.controllers.js"
import { query1 } from "../controllers/caren.controllers.js"
import { query2 } from "../controllers/caren.controllers.js"
import { query3 } from "../controllers/caren.controllers.js"
import { query4 } from "../controllers/caren.controllers.js"
import { query5 } from "../controllers/caren.controllers.js"
import { query6 } from "../controllers/caren.controllers.js"


const router = Router();

//Rutas van aqui ----------
router.post("/RegistarUsuario", query0);
router.get("/ObtenerCategorias", query1);
router.post("/ObtenerEmpresasPorCategorias", query2);
router.post("/ObtenerProductosPorEmpresa", query3);
router.post("/AceptarPedido", query4);
router.get("/ObtenerDepartamentos", query5);
router.post("/ObtenerMunicipiosxDepto", query6);
export default router;
