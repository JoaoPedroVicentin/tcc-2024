import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetBlocosPartidariosParams } from './interfaces/filterGetBlocosPartidariosParams.interface'
import { IGetBlocosPartidariosReturn } from './interfaces/getBlocosPartidariosReturn.interface'

export async function getBlocosPartidarios(
  filter: IFilterGetBlocosPartidariosParams,
): Promise<AxiosResponse<IGetBlocosPartidariosReturn>> {
  const response = await api.get(apiRoutes.blocosPartidarios, {
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
