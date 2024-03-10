interface Orgao {
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

interface LocalCamara {
  nome?: string
  predio?: string
  sala?: string
  anda?: string
}

export interface IGetEventosByIdReturn {
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
  orgaos: Orgao[]
  requerimentos: {
    titulo: string
    uri: string
  }[]
  localCamara: LocalCamara
  urlDocumentoPauta: string
  urlRegistro?: string
}
