import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetVotacoesEventoParams } from './interfaces/filterGetVotacoesEventoParams.interface'
import { IGetVotacoesEventoReturn } from './interfaces/getVotacoesEventoReturn.interface'

export async function getVotacoesEvento(
  id: number,
  filter?: IFilterGetVotacoesEventoParams,
): Promise<AxiosResponse<IGetVotacoesEventoReturn>> {
  const response = await api.get(apiRoutes.votacoesEvento(id), {
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
