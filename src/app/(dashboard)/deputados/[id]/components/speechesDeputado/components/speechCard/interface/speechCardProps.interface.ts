export interface ISpeechCardProps {
  typeSpeech: string
  summary: string
  faseEvent: {
    titulo: string
    dataHoraInicio: string | null
    dataHoraFim: string | null
  }
}
