import { IPropiedad, IReclamo, I_Inquilino } from "shared-common";

abstract class Reclamo implements IReclamo {
  prioridad: string;
  reclamante: string;
  descripcion: string;
  atencionRequerida: string;
  inicioInconveniente: Date;
  fechaReclamo: Date;
  propiedad?: string;
  inquilino?: string;
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
    if (obj.inquilino) {
      this.inquilino = obj.inquilino;
    }
  }
}

export { Reclamo };
