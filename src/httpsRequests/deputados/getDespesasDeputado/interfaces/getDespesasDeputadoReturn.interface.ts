import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetDespesasDeputadoReturn {
  dados: {
    ano: number
    mes: number
    tipoDespesa: string
    codDocumento: number
    tipoDocumento: string
    codTipoDocumento: number
    dataDocumento: string
    numDocumento: string
    valorDocumento: number
    urlDocumento: string | null
    nomeFornecedor: string
    cnpjCpfFornecedor: string
    valorLiquido: number
    valorGlosa: number
    numRessarcimento: string
    codLote: number
    parcela: number
  }[]
  links: ILinksReturn
}
