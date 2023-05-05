import { Router } from "express";
import { companyDisable, userDisable, getUsers, getCompany, getRepartidor } from "../controllers/isabel.controller.js";
const router = Router();

//Rutas van aqui ----------
router.post("/userDisable", userDisable);
router.post('/companyDisable', companyDisable);

router.get('/getUsers', getUsers);
router.get('/getCompany', getCompany);
router.get('/getRepartidor', getRepartidor);


export default router;