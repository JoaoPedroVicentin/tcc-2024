import { ILinksReturn } from '@/interfaces/linksReturn.interface'
import { IAutorData } from './autorData.interface'

export interface IGetAutoresProposicaoReturn {
  dados: IAutorData[]
  links: ILinksReturn
}
