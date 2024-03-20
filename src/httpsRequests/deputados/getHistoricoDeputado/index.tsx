import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetHistoricoDeputadoParams } from './interfaces/filterGetHistoricoDeputadoParams.interface'
import { IGetHistoricoDeputadoReturn } from './interfaces/getHistoricoDeputadoReturn.interface'

export async function getHistoricoDeputado(
  id: number,
  filter: IFilterGetHistoricoDeputadoParams,
): Promise<AxiosResponse<IGetHistoricoDeputadoReturn>> {
  const response = await api.get(apiRoutes.historicoDeputado(id), {
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
