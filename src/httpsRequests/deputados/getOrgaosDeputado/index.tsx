import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetOrgaosDeputadoParams } from './interface/filterGetOrgaosDeputadoParams.interface'
import { IGetOrgaosDeputadoReturn } from './interface/getOrgaosDeputadoReturn.interface'

export async function getOrgaosDeputado(
  id: number,
  filter: IFilterGetOrgaosDeputadoParams,
): Promise<AxiosResponse<IGetOrgaosDeputadoReturn>> {
  const response = await api.get(apiRoutes.orgaosDeputado(id), {
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
