export interface IGetPartidosReturn {
  dados: {
    id: number
    sigla: string
    nome: string
    uri: string
  }[]
  links: {
    rel: 'self' | 'next' | 'first' | 'last'
    href: string
  }[]
}
