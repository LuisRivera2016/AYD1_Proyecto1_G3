import { Router } from "express";
import { query101 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getAdminAllReports2", query101);

export default router;
