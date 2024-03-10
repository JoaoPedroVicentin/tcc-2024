import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetEventosByIdReturn } from './interface/getEventosByIdReturn.interface'

export async function getEventoById(
  id: number,
): Promise<AxiosResponse<IGetEventosByIdReturn>> {
  const response = await api.get(apiRoutes.eventoById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
