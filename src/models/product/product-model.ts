export type ProductModel = {
  id: string;
  name: string;
  category: ProductCategory;
  typeProduct: string;
  productImage: string | null;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  size: string | null;
  color: string | null;
  stock: number;
  priceInCents: number;
  sku: string | null;
};

export type ProductCategory = 'roupas' | 'calcados' | 'acessorios';

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


export type ProductData = Omit<ProductModel, 'id'>