// Tipado
export interface I_Inquilino {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  propiedades?: string[];
}

export interface IPropiedad {
  calle_dir: string;
  nro_dir: string;
  localidad: string;
  descripcion: string;
  cant_hab?: number;
  cant_bathroom?: number;
  area?: number;
  pisos?: number;
  inquilino?: string;
}

export interface IParams {
  inquilino?: string;
  properties?: string;
}
