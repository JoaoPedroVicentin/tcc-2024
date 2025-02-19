import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetOrgaosReturn {
  dados: {
    id: number
    uri: string
    sigla: string
    nome: string
    apelido: string
    codTipoOrgao: number
    tipoOrgao: string
    nomePublicacao: string
    nomeResumido: string | null
  }[]
  links: ILinksReturn[]
}
