import { API_URL } from './config'
import {
  IPropiedad,
  IReclamo,
  I_Inquilino,
  Reclamo,
  Propiedad,
  Inquilino,
  CTRLSesion,
} from 'shared-common'
import axios from 'axios'

class CTRLSesionFrontEnd extends CTRLSesion {
  static getUserAutenticado = async () => {
    return { _id: '1234' }
  }
}

class InquilinoFrontEnd extends Inquilino {
  static getInquilino = async (refInquilino: string) => {
    const props = await axios.get<I_Inquilino>(`${API_URL}/inquilinos`, {
      params: { refInquilino },
    })
    return props.data
  }
}

interface IPropiedadResponse {
  output: {
    propiedades: IPropiedad[]
  }
  message: string
}

class PropiedadFrontEnd extends Propiedad {
  static getInfoProperty = async (value: string, type: 'inquilino' | 'property') => {
    const props = await axios.get<IPropiedadResponse>(`${API_URL}/propiedades`, {
      params: { type, value },
    })
    const { output } = props.data
    return output?.propiedades ?? []
  }

  static añadirReclamo = async (value: { propiedad: string; reclamo: string }) => {
    const props = await axios.post(`${API_URL}/propiedades/reclamos`, value)
    return props.data
  }
}
class ReclamoFrontEnd extends Reclamo {
  static setReclamo = async (reclamo: IReclamo) => {
    const rec = await axios.post(`${API_URL}/reclamos`, reclamo)
    return rec.data
  }
}

export { PropiedadFrontEnd, InquilinoFrontEnd, ReclamoFrontEnd, CTRLSesionFrontEnd }
