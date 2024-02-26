export const internalRoutes = {
  deputados: '/deputados',
  partidos: '/partidos',
  partidosById: (id: number) => `/partidos/${id}`,
  frentesParlamentares: '/frentes-parlamentares',
  frenteParlamentarById: (id: number) => `/frentes-parlamentares/${id}`,
  blocosPartidarios: '/blocos-partidarios',
}
