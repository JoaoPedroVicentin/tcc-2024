import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetVotacoesProposicaoParams } from './interfaces/filterGetVotacoesProposicaoParams.interface'
import { IGetVotacoesProposicaoReturn } from './interfaces/getVotacoesProposicaoReturn.interface'

export async function getVotacoesProposicao(
  id: number,
  filter?: IFilterGetVotacoesProposicaoParams,
): Promise<AxiosResponse<IGetVotacoesProposicaoReturn>> {
  const response = await api.get(apiRoutes.votacoesProposicao(id), {
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
