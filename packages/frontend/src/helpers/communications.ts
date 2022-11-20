import { API_URL } from './config'
import { I_Inquilino } from 'shared-common'
import axios from 'axios'

const crearNuevoInquilino = async (inquilino: I_Inquilino) => {
  const inq = await axios.post(`${API_URL}/inquilinos`, inquilino)
  return inq.data
}

const getInfoProperty = async (value: string, type: 'inquilino' | 'property') => {
  const props = await axios.get(`${API_URL}/propiedades`, { params: { type, value } })
  return props.data
}

export { crearNuevoInquilino, getInfoProperty }
