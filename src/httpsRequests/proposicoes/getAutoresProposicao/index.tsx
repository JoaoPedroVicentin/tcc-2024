import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetAutoresProposicaoReturn } from './getAutoresProposicaoReturn.interface'

export async function getAutoresProposicao(
  id: number,
): Promise<AxiosResponse<IGetAutoresProposicaoReturn>> {
  const response = await api.get(apiRoutes.autoresProposicao(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
