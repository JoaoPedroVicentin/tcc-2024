import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetOrgaosReturn } from './interfaces/getOrgaosReturn.interface'
import { IFilterGetOrgaosParams } from './interfaces/filterGetOrgaosParams.interface'

export async function getOrgaos(
  filter: IFilterGetOrgaosParams,
): Promise<AxiosResponse<IGetOrgaosReturn>> {
  const response = await api.get(apiRoutes.orgaos, {
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
