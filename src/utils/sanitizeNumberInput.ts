
export function sanitizeNumberInput(
  value: string | number,
  maxLength?: number,
) {

  if(typeof value === 'number') return value;

  const numericValue = Number(value.replace(/\D/g, '').slice(0, maxLength || 10));

  if(isNaN(numericValue)) {
    return 0;
  }

  return numericValue
}