import { API_URL } from './config'
import { IPropiedad, I_Inquilino } from 'shared-common'
import axios from 'axios'

const crearNuevoInquilino = async (inquilino: I_Inquilino) => {
  const inq = await axios.post(`${API_URL}/inquilinos`, inquilino)
  return inq.data
}

interface IPropiedadResponse {
  output: {
    propiedades: IPropiedad[]
  }
  message: string
}

const getInfoProperty = async (value: string, type: 'inquilino' | 'property') => {
  const props = await axios.get<IPropiedadResponse>(`${API_URL}/propiedades`, { params: { type, value } })
  const { output, message } = props.data;
  console.log(message)
  return output?.propiedades ?? []
}

export { crearNuevoInquilino, getInfoProperty }
