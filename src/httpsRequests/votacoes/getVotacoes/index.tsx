import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetVotacoesParams } from './interfaces/filterGetVotacoesParams.interface'
import { IGetVotacoesReturn } from './interfaces/getVotacoesReturn.interface'

export async function getVotacoes(
  filter: IFilterGetVotacoesParams,
): Promise<AxiosResponse<IGetVotacoesReturn>> {
  const response = await api.get(apiRoutes.votacoes, {
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
