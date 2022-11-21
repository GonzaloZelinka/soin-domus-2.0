import { Router } from "express";
import { Inquilino, Propiedad, ReclamoBackEnd } from "./controller";

const router = Router();

// Inquilinos
router.get("/inquilinos", Inquilino.getInquilino);
// Propiedades
router.get("/propiedades", Propiedad.getInfoProperty);
// Reclamos
router.post("/reclamo", ReclamoBackEnd.setReclamo);
export default router;
