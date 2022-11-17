import { API_URL } from "./config"
import { I_Inquilino } from 'shared-common'
import axios from "axios"

export const crearNuevoInquilino = async (inquilino: I_Inquilino) => {
  const inq = await axios.post(`${API_URL}/inquilinos`, inquilino)
  return inq.data;
}