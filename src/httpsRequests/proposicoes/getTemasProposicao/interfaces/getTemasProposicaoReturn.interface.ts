import { ILinksReturn } from '@/interfaces/linksReturn.interface'
import { ITemaData } from './temaData.interface'

export interface IGetTemasProposicaoReturn {
  dados: ITemaData[]
  links: ILinksReturn[]
}
