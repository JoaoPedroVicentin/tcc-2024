import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IOrgaoData {
  id: string
  uri: string
  sigla: string
  nome: string
  apelido: string
  codTipoOrgao: number
  tipoOrgao: string
  nomePublicacao: string
  nomeResumido: string | null
  dataInicio: string | null
  dataInstalacao: string | null
  dataFim: string | null
  dataFimOriginal: string | null
  casa: string
  sala: string | null
  urlWebsite: string | null
}

export interface IGetOrgaoByIdReturn {
  dados: IOrgaoData
  links: ILinksReturn[]
}
