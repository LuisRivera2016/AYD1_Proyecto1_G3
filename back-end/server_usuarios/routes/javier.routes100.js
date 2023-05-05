import { Router } from "express";
import { query100 } from "../controllers/javier.controllers.js"
const router = Router();

//Rutas van aqui ----------
router.get("/getAdminAllReports", query100);

export default router;
