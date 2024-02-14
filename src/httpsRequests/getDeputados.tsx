import { apiRoutes } from '@/configs/apiRoutes'
import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'

interface IFilterGetDeputadosParams {
  pagina: string
  itens: string
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

export async function getDeputados({
  itens,
  pagina,
}: IFilterGetDeputadosParams): Promise<AxiosResponse<IGetDeputadosReturn>> {
  const response = await api.get(apiRoutes.deputados, {
    params: {
      itens,
      pagina,
    },
  })

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  }
}
