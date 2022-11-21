import { Router } from "express";
import { Inquilino, Propiedad, Reclamo } from "./controller";

const router = Router();

// Inquilinos
router.get("/inquilinos", Inquilino.getInquilino);
// Propiedades
router.get("/propiedades", Propiedad.getInfoProperty);
// Reclamos
router.post("/reclamo", Reclamo.setReclamo);
export default router;
