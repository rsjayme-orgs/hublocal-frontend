export function numberMask(value: string) {
  if (!value) return ''

  return value.replace(/\D/g, '')
}
