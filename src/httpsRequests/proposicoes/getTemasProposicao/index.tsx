import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetTemasProposicaoReturn } from './interfaces/getTemasProposicaoReturn.interface'

export async function getTemasProposicao(
  id: number,
): Promise<AxiosResponse<IGetTemasProposicaoReturn>> {
  const response = await api.get(apiRoutes.temasProposicao(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
