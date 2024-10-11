import { getYear, getMonth } from 'date-fns'

export function pastMonths(year: string): { value: string; month: string }[] {
  const yearNum = parseInt(year, 10)
  const yearCurrent = getYear(new Date())
  const monthCurrent = getMonth(new Date()) + 1

  const monthsNames: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  if (yearNum > yearCurrent) {
    return []
  } else {
    const monthLimit = yearNum === yearCurrent ? monthCurrent : 12
    const monthsPasts = Array.from({ length: monthLimit }, (_, i) => {
      return { value: (i + 1).toString(), month: monthsNames[i] }
    })

    if (yearNum === yearCurrent && monthCurrent !== 1) {
      monthsPasts.pop()
    }

    return monthsPasts
  }
}
