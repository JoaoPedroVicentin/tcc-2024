import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetOrgaosDeputadoReturn {
  dados: {
    idOrgao: number
    uriOrgao: string
    siglaOrgao: string
    nomeOrgao: string
    nomePublicacao: string
    titulo: string
    codTitulo: string
    dataInicio: string
    dataFim: string | null
  }
  links: ILinksReturn[]
}
