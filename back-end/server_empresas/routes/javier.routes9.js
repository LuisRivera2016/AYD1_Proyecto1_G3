import { Router } from "express";
import { query1, query13 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.post("/getAllProducts", query13);

export default router;
