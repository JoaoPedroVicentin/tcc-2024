import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetDespesasDeputadoParams } from './interfaces/filterGetDespesasDeputadoParams.interface'
import { IGetDespesasDeputadoReturn } from './interfaces/getDespesasDeputadoReturn.interface'

export async function getDespesasDeputado(
  id: number,
  filter: IFilterGetDespesasDeputadoParams,
): Promise<AxiosResponse<IGetDespesasDeputadoReturn>> {
  const response = await api.get(apiRoutes.despesasDeputado(id), {
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
