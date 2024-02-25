import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetDeputadosParams } from './interfaces/filterGetDeputadosParams.interface'
import { IGetDeputadosReturn } from './interfaces/getDeputadosReturn.interface'

export async function getDeputados(
  filter: IFilterGetDeputadosParams,
): Promise<AxiosResponse<IGetDeputadosReturn>> {
  const response = await api.get(apiRoutes.deputados, {
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
