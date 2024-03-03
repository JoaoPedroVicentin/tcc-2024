import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetProposicaoByIdReturn } from './interface/getProposicaoByIdReturn.interface'

export async function getProposicaoById(
  id: number,
): Promise<AxiosResponse<IGetProposicaoByIdReturn>> {
  const response = await api.get(apiRoutes.proposicaoById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
