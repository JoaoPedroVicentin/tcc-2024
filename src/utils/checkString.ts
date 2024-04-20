export function checkString(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return '---'
  } else {
    return value
  }
}
