import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetProfissoesDeputadoReturn {
  dados: {
    dataHore: number
    codTipoProfissao: number
    titulo: string
  }[]
  links: ILinksReturn[]
}
