import { ILinksReturn } from '@/interfaces/linksReturn.interface'

interface IOrgaoData {
  id: number
  uri: string
  sigla: string
  nome: string
  apelido: string
  codTipoOrgao: number
  tipoOrgao: string
  nomePublicacao: string
  nomeResumido: string
}

interface ILocalCamaraData {
  nome?: string
  predio?: string
  sala?: string
  andar?: string
}

export interface IGetEventosByIdReturn {
  dados: {
    uriDeputados?: string
    uriConvidados?: string
    fases?: string
    id: number
    uri: string
    dataHoraInicio: string
    dataHoraFim: string
    situacao: string
    descricaoTipo: string
    descricao: string
    localExterno?: string
    orgaos: IOrgaoData[]
    requerimentos: {
      titulo: string
      uri: string
    }[]
    localCamara: ILocalCamaraData
    urlDocumentoPauta: string
    urlRegistro?: string
  }
  links: ILinksReturn[]
}
