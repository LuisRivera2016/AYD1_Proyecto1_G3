import { Router } from "express";
import { addCategoryProduct } from "../controllers/isabel.controller.js";
const router = Router();

//Rutas van aqui ----------
router.post("/addCategoryProduct", addCategoryProduct);

export default router;