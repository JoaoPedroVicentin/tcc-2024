import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetMandatosReturn {
  dados: {
    anoFim: string
    anoInicio: string
    cargo: string
    municipio: string
    siglaPartidoEleicao: string
    siglaUf: string
    uriPartidoEleicao: string
  }[]
  links: ILinksReturn[]
}
