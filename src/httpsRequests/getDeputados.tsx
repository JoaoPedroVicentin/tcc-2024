import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'

interface IFilterGetDeputadosParams {
  pagina: string
  itens: string
  nome?: string
  siglaUf?: string
  siglaPartido?: string
}

interface IGetDeputadosReturn {
  dados: {
    id: number
    uri: string
    nome: string
    siglaPartido: string
    uriPartido: string
    siglaUf: string
    idLegislatura: number
    urlFoto: string
    email: string
  }[]
  links: {
    rel: 'self' | 'next' | 'first' | 'last'
    href: string
  }[]
}

export async function getDeputados(
  filter: IFilterGetDeputadosParams,
): Promise<AxiosResponse<IGetDeputadosReturn>> {
  const response = await api.get(apiRoutes.deputados, {
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
