import { Router } from "express";
import { Inquilino, Propiedad } from "./controller";

const router = Router();

// Inquilinos
router.get("/inquilinos", Inquilino.getInquilino);
// Propiedades
router.get("/propiedades", Propiedad.getInfoProperty);

export default router;
