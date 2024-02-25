import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetPartidoByIdReturn } from './interface/getPartidoByIdReturn.interface'

export async function getPartidoById(
  id: number,
): Promise<AxiosResponse<IGetPartidoByIdReturn>> {
  const response = await api.get(apiRoutes.partidosById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
