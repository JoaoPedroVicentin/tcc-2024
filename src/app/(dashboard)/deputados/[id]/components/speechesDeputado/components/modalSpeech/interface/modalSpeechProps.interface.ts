export interface IModalSpeechProps {
  speech: {
    data: string | null
    horario: string | null
    uriEvento: string
    titulo: string
    tipoDiscurso: string
    urlTexto: string
    urlAudio: string | null
    urlVideo: string | null
    keywords: string
    sumario: string
    transcricao: string
  }
  isOpen: boolean
  onClose: () => void
}
