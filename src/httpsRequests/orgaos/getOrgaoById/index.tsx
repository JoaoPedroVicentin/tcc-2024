import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IGetOrgaoByIdReturn } from './interface/getOrgaoByIdReturn.interface'

export async function getOrgaoById(
  id: number,
): Promise<AxiosResponse<IGetOrgaoByIdReturn>> {
  const response = await api.get(apiRoutes.orgaoById(id))

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
