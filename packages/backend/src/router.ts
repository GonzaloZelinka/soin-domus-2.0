import { Router } from "express";
import { Inquilino, Propiedad } from "./controller";

const router = Router();

// Inquilinos
router.post("/inquilinos", Inquilino.nuevoInquilino);
// Propiedades
router.get("/propiedades", Propiedad.getInfoPropiedad);

export default router;
