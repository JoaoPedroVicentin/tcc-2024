export function yearsBetweenCurrentYearAnd2019(): number[] {
  const currentYear = new Date().getFullYear()
  const years: number[] = []

  for (let year = currentYear; year >= 2019; year--) {
    years.push(year)
  }

  return years
}
