import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetEventosDeputadoParams } from './interfaces/filterGetEventosDeputadoParams.interface'
import { IGetEventosDeputadoReturn } from './interfaces/getEventosDeputadoReturn.inteface'

export async function getEventosDeputado(
  id: number,
  filter: IFilterGetEventosDeputadoParams,
): Promise<AxiosResponse<IGetEventosDeputadoReturn>> {
  const response = await api.get(apiRoutes.eventosDeputado(id), {
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
