export function sanitizeNumberInput(
  value: string | number,
  maxLength: number
) {

  if(typeof value === 'number') value = value.toString();

  const numericValue = Number(value.replace(/\D/g, '').slice(0, maxLength));

  return numericValue
}