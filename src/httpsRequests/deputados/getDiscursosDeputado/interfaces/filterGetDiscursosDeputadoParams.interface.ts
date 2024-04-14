export interface IFilterGetDiscursosDeputadoParams {
  pagina?: string
  itens?: string
  idLegislatura?: string
  ano?: string
}

export type TFilterGetDiscursosDeputadoParams =
  IFilterGetDiscursosDeputadoParams[keyof IFilterGetDiscursosDeputadoParams]
