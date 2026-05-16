export type ProductModel = {
  id: string;
  name: string;
  category: ProductCategory;
  typeProduct: string;
  productImage: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stock: number;
  priceInCents: number;
  sku?: string;
};

export type ProductCategory = 'roupa' | 'calcado' | 'acessorio';

export type teste =
  | 'jaqueta'
  | 'saia'
  | 'blusa'
  | 'calça'
  | 'vestido'
  | 'blazer'
  | 'short'
  | 'camisa'
  | 'bermuda'
  | 'tênis'
  | 'acessório';
