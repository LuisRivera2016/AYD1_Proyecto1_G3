import { Router } from "express";
import {index, pingdb} from "../controllers/index.controller.js"

const router = Router();

router.get("/", index);
router.get("/ping-db", pingdb);

export default router;
