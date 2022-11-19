import { Router } from "express";
import { 
  Inquilino, 
  Propiedad 
} from "./controller";

const router = Router();

// Inquilinos
router.post("/inquilino", Inquilino.nuevoInquilino);
// Propiedades
router.get("/propiedad", Propiedad.getInfoPropiedad);

export default router;
