import { Router } from "express";
import { nuevoInquilino } from "./controller";

const router = Router();

router.post("/inquilinos", nuevoInquilino);

export default router;
