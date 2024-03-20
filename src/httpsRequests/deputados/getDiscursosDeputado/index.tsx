import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetDiscursosDeputadoParams } from './interfaces/filterGetDiscursosDeputadoParams.interface'
import { IGetDiscursosDeputadoReturn } from './interfaces/getDiscursosDeputadoReturn.interface'

export async function getDiscursosDeputado(
  id: number,
  filter: IFilterGetDiscursosDeputadoParams,
): Promise<AxiosResponse<IGetDiscursosDeputadoReturn>> {
  const response = await api.get(apiRoutes.discursosDeputado(id), {
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
