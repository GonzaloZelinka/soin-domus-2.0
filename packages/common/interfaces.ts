// Tipado
export interface I_Inquilino {
  id: string;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  dni: number;
  propiedades?: string[];
}

export interface IPropiedad {
  id: string;
  calle_dir: string;
  nro_dir: number;
  localidad: string;
  descripcion: string;
  cant_hab?: number;
  cant_bathroom?: number;
  area?: number;
  pisos?: number;
  inquilino?: string;
}

export interface IReclamo {
  prioridad: string;
  reclamante: string;
  descripcion: string;
  atencionRequerida: string;
  inicioInconveniente: Date;
  fechaReclamo: Date;
  propiedad?: string;
  inquilino?: string;
}

export interface IParams {
  inquilino?: string;
  properties?: string;
}
