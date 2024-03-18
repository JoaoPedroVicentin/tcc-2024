import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetOrgaoByIdReturn {
  dados: {
    id: number
    uri: string
    sigla: string
    nome: string
    apelido: string
    codTipoOrgao: number
    tipoOrgao: string
    nomePublicacao: string
    nomeResumido: null | string
    dataInicio: null | string
    dataInstalacao: null | string
    dataFim: null | string
    dataFimOriginal: null | string
    casa: string
    sala: null | string
    urlWebsite: null | string
  }[]
  links: ILinksReturn[]
}
