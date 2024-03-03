export const internalRoutes = {
  deputados: '/deputados',
  proposicoes: '/proposicoes',
  proposicaoById: (id: number) => `/proposicoes/${id}`,
  partidos: '/partidos',
  partidosById: (id: number) => `/partidos/${id}`,
  frentesParlamentares: '/frentes-parlamentares',
  frenteParlamentarById: (id: number) => `/frentes-parlamentares/${id}`,
  blocosPartidarios: '/blocos-partidarios',
}
