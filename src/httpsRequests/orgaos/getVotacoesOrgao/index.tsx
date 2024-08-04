import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetVotacoesOrgaoParams } from './interfaces/filterGetVotacoesOrgaoParams.interface'
import { IGetVotacoesOrgaoReturn } from './interfaces/getVotacoesOrgaoReturn.interface'

export async function getVotacoesOrgao(
  id: string,
  filter?: IFilterGetVotacoesOrgaoParams,
): Promise<AxiosResponse<IGetVotacoesOrgaoReturn>> {
  const response = await api.get(apiRoutes.votacoesOrgao(id), {
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
