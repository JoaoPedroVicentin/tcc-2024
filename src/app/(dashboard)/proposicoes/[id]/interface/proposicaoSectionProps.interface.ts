import { IGetProposicaoByIdReturn } from '@/httpsRequests/proposicoes/getProposicaoById/interface/getProposicaoByIdReturn.interface'

export interface IProposicaoSectionProps {
  proposicao: IGetProposicaoByIdReturn['dados']
}
