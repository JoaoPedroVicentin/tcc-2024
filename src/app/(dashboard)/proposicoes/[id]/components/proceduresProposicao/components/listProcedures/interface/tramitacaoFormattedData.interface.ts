export interface ITramitacaoFormattedData {
  data: string
  tramites: {
    siglaOrgao: string
    orgaoTramites: {
      hora: string
      sequencia: number
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
    }[]
  }[]
}
