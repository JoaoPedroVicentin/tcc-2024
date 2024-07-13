import {
  Calendar,
  CalendarCheck,
  CalendarSlash,
  CalendarX,
  Megaphone,
  QuestionMark,
  SpinnerGap,
} from '@phosphor-icons/react'

export const SITUACOES_EVENTO = [
  {
    cod: '1',
    nome: 'Não Confirmada',
    icon: QuestionMark,
  },
  {
    cod: '2',
    nome: 'Convocada',
    icon: Megaphone,
  },
  {
    cod: '3',
    nome: 'Em Andamento',
    icon: SpinnerGap,
  },
  {
    cod: '4',
    nome: 'Encerrada',
    icon: CalendarCheck,
  },
  {
    cod: '5',
    nome: 'Cancelada',
    icon: CalendarX,
  },
  {
    cod: '6',
    nome: 'Suspensa ',
    icon: CalendarSlash,
  },
  {
    cod: '7',
    nome: 'Encerrada (Termo)',
    icon: CalendarCheck,
  },
  {
    cod: '8',
    nome: 'Encerrada (Final)',
    icon: CalendarCheck,
  },
  {
    cod: '9',
    nome: 'Encerrada (Comunicado)',
    icon: CalendarCheck,
  },
  {
    cod: '130',
    nome: 'Agendada ',
    icon: Calendar,
  },
]
