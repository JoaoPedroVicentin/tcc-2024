import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetMandatosReturn } from './interface/getMandatosDeputadoReturn.interface'

export async function getMandatosDeputado(
  id: number,
): Promise<AxiosResponse<IGetMandatosReturn>> {
  const response = await api.get(apiRoutes.mandatosDeputado(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
