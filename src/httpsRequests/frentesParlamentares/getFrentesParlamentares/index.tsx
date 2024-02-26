import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { IFilterGetFrentesParlamentaresParams } from './interfaces/filterGetFrentesParlamentaresParams.interface'
import { IGetFrentesParlamentaresReturn } from './interfaces/getFrentesParlamentaresReturn.interface'

export async function getFrentesParlamentares(
  filter: IFilterGetFrentesParlamentaresParams,
): Promise<AxiosResponse<IGetFrentesParlamentaresReturn>> {
  const response = await api.get(apiRoutes.frentesParlamentares, {
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
