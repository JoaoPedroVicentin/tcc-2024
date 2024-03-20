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
    descUltimaAberturaVotacao: string | null
    dataHoraUltimaAberturaVotacao: string | null
    ultimaApresentacaoProposicao: {
      dataHoraRegistro: string | null
      descricao: string
      uriProposicaoCitada: string | null
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
