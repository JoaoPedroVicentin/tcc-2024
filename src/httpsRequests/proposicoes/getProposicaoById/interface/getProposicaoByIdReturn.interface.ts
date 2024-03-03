import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetProposicaoByIdReturn {
  dados: {
    id: number
    uri: string
    siglaTipo: string
    codTipo: number
    numero: number
    ano: number
    ementa: string
    dataApresentacao: string
    uriOrgaoNumerador: string
    statusProposicao: {
      dataHora: string
      sequencia: number
      siglaOrgao: string
      uriOrgao: string
      uriUltimoRelator: string
      regime: string
      descricaoTramitacao: string
      codTipoTramitacao: string
      descricaoSituacao: string
      codSituacao: number
      despacho: string
      url: string | null
      ambito: string
      apreciacao: string
    }
    uriAutores: string
    descricaoTipo: string
    ementaDetalhada: string
    keywords: string
    uriPropPrincipal: string | null
    uriPropAnterior: string | null
    uriPropPosterior: string | null
    urlInteiroTeor: string
    urnFinal: string | null
    texto: string | null
    justificativa: string | null
  }
  links: ILinksReturn[]
}
