import { Router } from "express";
import { 
  nuevoInquilino, 
  getInfoPropiedad 
} from "./controller";

const router = Router();

router.post("/inquilino", nuevoInquilino);
router.get("/inquilino", getInfoPropiedad);

export default router;
