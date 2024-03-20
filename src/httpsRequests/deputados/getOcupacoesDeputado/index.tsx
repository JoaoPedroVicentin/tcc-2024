import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetOcupacoesDeputadoReturn } from './interface/getOcupacoesDeputadoReturn.interface'

export async function getOcupacoesDeputado(
  id: number,
): Promise<AxiosResponse<IGetOcupacoesDeputadoReturn>> {
  const response = await api.get(apiRoutes.ocupacoesDeputado(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
