export type ProductModel = {
  id: string;
  name: string;
  category: ProductCategory;
  productImage: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  sku?: string;
};

export type ProductCategory =
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
