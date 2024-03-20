import { ILinksReturn } from '@/interfaces/linksReturn.interface'

export interface IGetDiscursosDeputadoReturn {
  dados: {
    dataHoraInicio: string
    dataHoraFim: string | null
    uriEvento: string
    faseEvento: {
      titulo: string
      dataHoraInicio: string | null
      dataHoraFim: string | null
    }
    tipoDiscurso: string
    urlTexto: string
    urlAudio: string | null
    urlVideo: string | null
    keywords: string
    sumario: string
    transcricao: string
  }[]
  links: ILinksReturn[]
}
