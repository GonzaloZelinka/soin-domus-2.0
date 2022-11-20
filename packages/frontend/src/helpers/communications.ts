import { API_URL } from './config'
import { IPropiedad, I_Inquilino } from 'shared-common'
import axios from 'axios'

interface IPropiedadResponse {
  output: {
    propiedades: IPropiedad[]
  }
  message: string
}

const getInfoProperty = async (value: string, type: 'inquilino' | 'property') => {
  const props = await axios.get<IPropiedadResponse>(`${API_URL}/propiedades`, {
    params: { type, value },
  })
  const { output, message } = props.data
  console.log(message)
  return output?.propiedades ?? []
}

const getInquilino = async (refInquilino: string) => {
  const props = await axios.get<I_Inquilino>(`${API_URL}/inquilinos`, { params: { refInquilino } })
  return props.data
}
export { getInfoProperty, getInquilino }
