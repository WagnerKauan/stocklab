import { Product, StockMovement, Variant } from "../../../generated/prisma/client";




export type MovementModel = {
  product: Product;
  variant: Variant;

} & StockMovement


export type MovementData = {
  productId: string;
  variantId: string;
  type: 'IN' | 'OUT';
  quantity: number;
}