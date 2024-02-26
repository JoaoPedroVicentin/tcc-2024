export const apiRoutes = {
  deputados: '/deputados',
  partidos: '/partidos',
  partidosById: (id: number) => `/partidos/${id}`,
  frentesParlamentares: '/frentes',
  frenteParlamentarById: (id: number) => `/frentes/${id}`,
  blocosPartidarios: '/blocos',
}
