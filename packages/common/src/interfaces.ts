// Tipado
export interface I_Inquilino {
  _id?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  dni: number;
  propiedades?: string[];
}

export interface IPropiedad {
  _id?: string;
  calle_dir: string;
  nro_dir: number;
  localidad: string;
  descripcion: string;
  cant_hab?: number;
  cant_bathroom?: number;
  area?: number;
  pisos?: number;
  inquilino?: string;
  reclamos?: string[];
}

export interface IReclamo {
  _id?: string;
  prioridad: string;
  reclamante: string;
  descripcion: string;
  atencionRequerida: string;
  inicioInconveniente: Date;
  fechaReclamo: Date;
  propiedad?: string;
}

export interface IParams {
  inquilino?: string;
  properties?: string;
}

export interface IUser {
  _id?: string;
}
