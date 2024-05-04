export interface ITramitacaoData {
  dataHora: string
  sequencia: number
  siglaOrgao: string
  uriOrgao: string
  uriUltimoRelator: string | null
  regime: string
  descricaoTramitacao: string
  codTipoTramitacao: string
  descricaoSituacao: string | null
  codSituacao: number | null
  despacho: string
  url: string | null
  ambito: string
  apreciacao: string
}
