import { ILinksReturn } from '@/interfaces/linksReturn.interface'

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
    orgaos: {
      id: number
      uri: string
      sigla: string
      nome: string
      apelido: string
      codTipoOrgao: number
      tipoOrgao: string
      nomePublicacao: string
      nomeResumido?: string
    }[]
    localCamara: {
      nome: string
      predio?: string
      sala?: string
      andar?: string
    }
    urlRegistro: string
  }[]
  links: ILinksReturn[]
}
