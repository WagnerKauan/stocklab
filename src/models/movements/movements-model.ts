import { Product, StockMovement, Variant } from "../../../generated/prisma/client";




export type MovementModel = {
  product: Product;
  variant: Variant;

} & StockMovement