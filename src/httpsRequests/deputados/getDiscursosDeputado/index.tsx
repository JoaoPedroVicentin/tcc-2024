import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import {
  IFilterGetDiscursosDeputadoParams,
  TFilterGetDiscursosDeputadoParams,
} from './interfaces/filterGetDiscursosDeputadoParams.interface'
import { IGetDiscursosDeputadoReturn } from './interfaces/getDiscursosDeputadoReturn.interface'

export async function getDiscursosDeputado(
  id: number,
  filter: IFilterGetDiscursosDeputadoParams,
): Promise<AxiosResponse<IGetDiscursosDeputadoReturn>> {
  const { idLegislatura, ano, itens, pagina } = filter

  const params: { [key: string]: TFilterGetDiscursosDeputadoParams } = {
    idLegislatura,
    itens,
    pagina,
  }

  if (ano) {
    params.dataInicio = `${ano}-01-01`
    params.dataFim = `${ano}-12-31`
  }

  const response = await api.get(apiRoutes.discursosDeputado(id), {
    params,
  })

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
