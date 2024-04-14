export function hasNonNullFields(obj: {
  [key: string]: string | number | undefined | null
}): boolean {
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      return true
    }
  }
  return false
}
