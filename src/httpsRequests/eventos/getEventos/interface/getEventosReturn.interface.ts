import { ILinksReturn } from '@/interfaces/linksReturn.interface'

interface Orgao {
  id: number
  uri: string
  sigla: string
  nome: string
  apelido: string
  codTipoOrgao: number
  tipoOrgao: string
  nomePublicacao: string
  nomeResumido?: string
}

interface LocalCamara {
  nome: string
  predio?: string
  sala?: string
  andar?: string
}

export interface IGetEventosReturn {
  dados: {
    id: number
    uri: string
    dataHoraInicio: string
    dataHoraFim?: string
    situacao: string
    descricaoTipo: string
    descricao: string
    localExterno?: string
    orgaos: Orgao[]
    localCamara: LocalCamara
    urlRegistro: string
  }[]
  links: ILinksReturn[]
}
