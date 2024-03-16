import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetVotacaoByIdReturn {
  dados: {
    id: string
    uri: string
    data: string
    dataHoraRegistro: string
    siglaOrgao: string
    uriOrgao: string
    idOrgao: number
    uriEvento: string
    idEvento: number
    descricao: string
    aprovacao: number
    descUltimaAberturaVotacao: null | string
    dataHoraUltimaAberturaVotacao: null | string
    ultimaApresentacaoProposicao: {
      dataHoraRegistro: null | string
      descricao: string
      uriProposicaoCitada: null | string
    }
    efeitosRegistrados: {
      dataHoraResultado: string
      dataHoraUltimaAberturaVotacao: string
      dataHoraUltimaApresentacaoProposicao: string
      descResultado: string
      descUltimaAberturaVotacao: string
      descUltimaApresentacaoProposicao: string
      tituloProposicao: string
      tituloProposicaoCitada: string
      uriProposicao: string
      uriProposicaoCitada: string
    }[]
    objetosPossiveis: {
      id: number
      uri: string
      siglaTipo: string
      codTipo: number
      numero: number
      ano: number
      ementa: string
    }[]
    proposicoesAfetadas: {
      id: number
      uri: string
      siglaTipo: string
      codTipo: number
      numero: number
      ano: number
      ementa: string
    }[]
  }
  links: ILinksReturn[]
}
