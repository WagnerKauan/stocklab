export function sanitizeNumberInput(
  value: string,
  maxLength: number
) {
  return value
    .replace(/\D/g, '')
    .slice(0, maxLength)
}