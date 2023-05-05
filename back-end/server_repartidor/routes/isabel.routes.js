import { Router } from "express";
import { orderStatusChange } from "../controllers/isabel.controller.js";
const router = Router();

//Rutas van aqui ----------
router.post("/orderStatusChange", orderStatusChange);

export default router;