import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetTramitacoesProposicaoParams } from './interfaces/filterGetTramitacoesProposicaoParams.interface'
import { IGetTramitacoesProposicaoReturn } from './interfaces/getTramitacoesProposicaoReturn.interface'

export async function getTramitacoesProposicao(
  id: number,
  filter?: IFilterGetTramitacoesProposicaoParams,
): Promise<AxiosResponse<IGetTramitacoesProposicaoReturn>> {
  const response = await api.get(apiRoutes.tramitacoesProposicao(id), {
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
