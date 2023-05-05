import { Router } from "express";
import { index, ping } from "../controllers/index.controller.js"

const router = Router();

//Rutas van aqui ----------
router.get("/", index);
router.get("/ping", ping)

export default router;