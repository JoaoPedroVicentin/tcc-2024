import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetProfissoesDeputadoReturn } from './interface/getProfissoesDeputadoReturn.interface'

export async function getProfissoesDeputado(
  id: number,
): Promise<AxiosResponse<IGetProfissoesDeputadoReturn>> {
  const response = await api.get(apiRoutes.profissoesDeputado(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
