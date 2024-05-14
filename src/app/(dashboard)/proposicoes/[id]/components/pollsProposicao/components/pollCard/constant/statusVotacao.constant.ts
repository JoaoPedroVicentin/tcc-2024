import { CheckCircle, Empty, XCircle } from '@phosphor-icons/react'

export const STATUS_VOTACAO = {
  NULL: {
    icon: Empty,
    text: 'Não informado',
    className:
      'flex items-center gap-2 border border-theme-black-50 bg-theme-gray-50 px-3 py-2 text-theme-black-50',
  },
  0: {
    icon: XCircle,
    text: 'Não aprovado',
    className:
      'flex items-center gap-2 border border-theme-red-100 bg-theme-red-50 px-3 py-2 text-theme-black-50',
  },
  1: {
    icon: CheckCircle,
    text: 'Aprovado',
    className:
      'flex items-center gap-2 border border-theme-green-100 bg-theme-green-50 px-3 py-2 text-theme-black-50',
  },
}
