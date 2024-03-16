import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetVotacaoByIdReturn } from './interface/getVotacaoByIdReturn.interface'

export async function getVotacaoById(
  id: number,
): Promise<AxiosResponse<IGetVotacaoByIdReturn>> {
  const response = await api.get(apiRoutes.votacaoById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
