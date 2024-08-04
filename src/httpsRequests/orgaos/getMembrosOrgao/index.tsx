import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetMembrosOrgaoReturn } from './interface/getDeputadosEventoReturn.interface'

export async function getMembrosOrgao(
  id: string,
): Promise<AxiosResponse<IGetMembrosOrgaoReturn>> {
  const response = await api.get(apiRoutes.membrosOrgao(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
