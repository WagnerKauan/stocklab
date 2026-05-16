export function formatCurrencyInput(value: string) {
  if(!value) return { value: '', formatted: '' };

  console.log(typeof value);
  
  const numbers = value.replace(/\D/g, '').slice(0, 6);

  const amount = Number(numbers) / 100;

  return {
    value: numbers,
    formatted: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount),
  };
}

export function convertReal(amount: string): number {
  const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
  return numericPrice;
}
