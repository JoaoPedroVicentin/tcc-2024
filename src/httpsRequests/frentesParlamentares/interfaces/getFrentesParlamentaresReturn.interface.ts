export interface IGetFrentesParlamentaresReturn {
  dados: {
    id: number
    idLegislatura: number
    titulo: string
    uri: string
  }[]
  links: {
    rel: 'self' | 'next' | 'first' | 'last'
    href: string
  }[]
}
