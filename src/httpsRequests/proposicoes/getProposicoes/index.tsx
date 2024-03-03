import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetProposicoesParams } from './interfaces/filterGetProposicoesParams.interface'
import { IGetProposicoesReturn } from './interfaces/getProposicoesReturn.interface'

export async function getProposicoes(
  filter: IFilterGetProposicoesParams,
): Promise<AxiosResponse<IGetProposicoesReturn>> {
  const response = await api.get(apiRoutes.proposicoes, {
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
