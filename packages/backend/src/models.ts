// https://mongoosejs.com/docs/typescript.html
import { Schema, model, Types } from "mongoose";
import { I_Inquilino, IPropiedad } from "shared-common";

const SInquilino = new Schema<I_Inquilino>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  // Array de "referencias" a Propiedades
  propiedades: [{ type: Schema.Types.ObjectId, ref: "Propiedad", default: [] }],
});
export const Inquilino = model("Inquilino", SInquilino);

const SPropiedad = new Schema<IPropiedad>({
  calle_dir: { type: String, required: true },
  nro_dir: { type: String, required: true },
  localidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  cant_hab: { type: Number, required: true },
  cant_bathroom: { type: Number, required: true },
  area: { type: Number, required: true },
  pisos: { type: Number, required: true },
});
export const Propiedad = model("Propiedad", SPropiedad);
