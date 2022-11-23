import { IPropiedad, IReclamo, I_Inquilino, IUser } from "./index";

abstract class Reclamo implements IReclamo {
  _id?: string;
  prioridad: string;
  reclamante: string;
  descripcion: string;
  atencionRequerida: string;
  inicioInconveniente: Date;
  fechaReclamo: Date;
  propiedad?: string;
  static setReclamo = (...args: any[]): any => undefined;
  constructor(obj: IReclamo) {
    this.prioridad = obj.prioridad;
    this.reclamante = obj.reclamante;
    this.descripcion = obj.descripcion;
    this.atencionRequerida = obj.atencionRequerida;
    this.inicioInconveniente = obj.inicioInconveniente;
    this.fechaReclamo = obj.fechaReclamo;
    if (obj.propiedad) {
      this.propiedad = obj.propiedad;
    }
  }
}
abstract class Propiedad implements IPropiedad {
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
  static getInfoProperty = (...args: any[]): any => undefined;
  static añadirReclamo = (...args: any[]): any => undefined;
  constructor(obj: IPropiedad) {
    if (obj._id) {
      this._id = obj._id;
    }
    this._id = obj._id;
    this.calle_dir = obj.calle_dir;
    this.nro_dir = obj.nro_dir;
    this.descripcion = obj.descripcion;
    this.localidad = obj.localidad;
    if (obj.cant_hab) {
      this.cant_hab = obj.cant_hab;
    }
    if (obj.cant_bathroom) {
      this.cant_bathroom = obj.cant_bathroom;
    }
    if (obj.area) {
      this.area = obj.area;
    }
    if (obj.pisos) {
      this.pisos = obj.pisos;
    }
    if (obj.area) {
      this.area = obj.area;
    }
    if (obj.inquilino) {
      this.inquilino = obj.inquilino;
    }
    if (obj?.reclamos?.length !== 0) {
      this.reclamos = obj.reclamos;
    }
  }
}
abstract class Inquilino implements I_Inquilino {
  _id?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  dni: number;
  propiedades?: string[];
  static getInquilino = (...args: any[]): any => undefined;
  constructor(obj: I_Inquilino) {
    this._id = obj._id;
    if (obj._id) {
      this._id = obj._id;
    }
    this.nombre = obj.nombre;
    this.apellido = obj.apellido;
    this.telefono = obj.telefono;
    this.email = obj.email;
    this.dni = obj.dni;
    if (obj?.propiedades?.length !== 0) {
      this.propiedades = obj.propiedades;
    }
  }
}
abstract class CTRLSesion implements IUser {
  _id?: string;
  static getUserAutenticado = (...args: any[]): any => undefined;
  constructor(obj: I_Inquilino) {
    if (obj._id) {
      this._id = obj._id;
    }
  }
}
export { Reclamo, Propiedad, Inquilino, CTRLSesion };
