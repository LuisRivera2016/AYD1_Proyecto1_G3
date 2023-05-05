import { Router } from "express";
import { query102 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getAdminAllReports3", query102);

export default router;
