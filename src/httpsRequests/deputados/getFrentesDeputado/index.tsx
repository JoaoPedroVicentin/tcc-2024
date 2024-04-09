import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetFrentesDeputadoReturn } from './interface/getFrentesDeputadoReturn.interface'

export async function getFrentesDeputado(
  id: number,
): Promise<AxiosResponse<IGetFrentesDeputadoReturn>> {
  const response = await api.get(apiRoutes.frentesDeputado(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
