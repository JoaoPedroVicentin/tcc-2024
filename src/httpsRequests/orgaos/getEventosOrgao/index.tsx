import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetEventosOrgaoParams } from './interfaces/filterGetEventosOrgaoParams.interface'
import { IGetEventosOrgaoReturn } from './interfaces/getEventosOrgaoReturn.inteface'

export async function getEventosOrgao(
  id: string,
  filter: IFilterGetEventosOrgaoParams,
): Promise<AxiosResponse<IGetEventosOrgaoReturn>> {
  const response = await api.get(apiRoutes.eventosOrgao(id), {
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
