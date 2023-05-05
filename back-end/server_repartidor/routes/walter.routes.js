import { Router } from "express";
import { getCalificacion, getComisionTotal, getDatos, ingresarSolicitud } from "../controllers/walter.controller.js";

const router = Router();

router.post("/solicitud-cambio", ingresarSolicitud);
router.get("/calificacion-repartidor", getCalificacion);
router.post("/info-repartidor", getDatos);
router.get("/comision-total", getComisionTotal);

export default router;
