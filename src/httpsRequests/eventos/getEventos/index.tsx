import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetEventosParams } from './interfaces/filterGetEventosParams.interface'
import { IGetEventosReturn } from './interfaces/getEventosReturn.interface'

export async function getEventos(
  filter: IFilterGetEventosParams,
): Promise<AxiosResponse<IGetEventosReturn>> {
  const response = await api.get(apiRoutes.eventos, {
    params: filter,
  })

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
