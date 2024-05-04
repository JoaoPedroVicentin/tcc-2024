import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetProposicoesReturn } from '../getProposicoes/interfaces/getProposicoesReturn.interface'

export async function getRelatedProposicao(
  id: number,
): Promise<AxiosResponse<IGetProposicoesReturn>> {
  const response = await api.get(apiRoutes.relatedProposicao(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
