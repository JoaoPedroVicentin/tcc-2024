export interface IFilterGetDiscursosDeputadoParams {
  pagina?: string
  itens?: string
  idLegislatura?: string
  ano?: string
  ordem?: 'ASC' | 'DESC'
}

export type TFilterGetDiscursosDeputadoParams =
  IFilterGetDiscursosDeputadoParams[keyof IFilterGetDiscursosDeputadoParams]
