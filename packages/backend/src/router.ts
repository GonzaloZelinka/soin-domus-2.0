import { Router } from "express";
import {
  InquilinoBackEnd,
  PropiedadBackEnd,
  ReclamoBackEnd,
} from "./controller";

const router = Router();

// Inquilinos
router.get("/inquilinos", InquilinoBackEnd.getInquilino);
// Propiedades
router.get("/propiedades", PropiedadBackEnd.getInfoProperty);
router.post("/propiedades/reclamos", PropiedadBackEnd.añadirReclamo);
// Reclamos
router.post("/reclamos", ReclamoBackEnd.setReclamo);
export default router;
