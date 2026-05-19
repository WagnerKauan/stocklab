import { ProductVariant } from '@/models/product/product-model';
import { sanitizeNumberInput } from './sanitizeNumberInput';

export function sanitizeVariant(variant: ProductVariant): ProductVariant {
  variant.stock = sanitizeNumberInput(variant.stock, 4);
  variant.priceInCents = sanitizeNumberInput(variant.priceInCents, 4);
  if (!isNaN(Number(variant.priceInCents)) && !isNaN(Number(variant.stock))) {
    variant.priceInCents = Number(variant.priceInCents);
    variant.stock = Number(variant.stock);
  }
  return variant;
}
