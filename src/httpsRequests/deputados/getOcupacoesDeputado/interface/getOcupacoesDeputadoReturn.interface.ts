import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetOcupacoesDeputadoReturn {
  dados: {
    anoFim: number
    anoInicio: number
    entidade: string
    entidadePais: string
    entidadeUF: string
    titulo: string
  }
  links: ILinksReturn[]
}
