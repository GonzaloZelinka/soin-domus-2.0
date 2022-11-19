import { Router } from "express";
import { 
  Inquilino, 
  Propiedad 
} from "./controller";

const router = Router();

router.post("/inquilino", Inquilino.nuevoInquilino);
router.get("/inquilino", Propiedad.getInfoPropiedad);

export default router;
