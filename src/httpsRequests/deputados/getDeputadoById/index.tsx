import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetDeputadoByIdReturn } from './interface/getDeputadoByIdReturn.interface'

export async function getDeputadoById(
  id: number,
): Promise<AxiosResponse<IGetDeputadoByIdReturn>> {
  const response = await api.get(apiRoutes.deputadoById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
