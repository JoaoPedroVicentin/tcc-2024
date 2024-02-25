export interface IGetBlocosPartidariosReturn {
  dados: {
    id: number
    idLegislatura: number
    nome: string
    uri: string
  }[]
  links: {
    rel: 'self' | 'next' | 'first' | 'last'
    href: string
  }[]
}
