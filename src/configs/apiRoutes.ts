export const apiRoutes = {
  deputados: '/deputados',
  partidos: '/partidos',
  partidoById: (id: number) => `/partidos/${id}`,
  frentesParlamentares: '/frentes',
  frenteParlamentarById: (id: number) => `/frentes/${id}`,
  proposicoes: '/proposicoes',
  proposicaoById: (id: number) => `/proposicoes/${id}`,
  blocosPartidarios: '/blocos',
}
