import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetFrenteParlamentarByIdReturn } from './interface/getFrenteParlamentarByIdReturn.interface'

export async function getFrenteParlamentarById(
  id: number,
): Promise<AxiosResponse<IGetFrenteParlamentarByIdReturn>> {
  const response = await api.get(apiRoutes.frenteParlamentarById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
