import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetPartidosReturn } from './interfaces/getPartidosReturn.interface'
import { IFilterGetPartidosParams } from './interfaces/filterGetPartidosParams.interface'

export async function getPartidos(
  filter: IFilterGetPartidosParams,
): Promise<AxiosResponse<IGetPartidosReturn>> {
  const response = await api.get(apiRoutes.partidos, {
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
