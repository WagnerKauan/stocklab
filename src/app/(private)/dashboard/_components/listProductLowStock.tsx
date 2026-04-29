'use client';

import {
  MINIMUM_STOCK_PRODUCT,
  MINIMUM_STOCK_VARIANTS,
} from '@/settings/variablesGlobal';
import { CardProductLowStock } from './cardProductLowStock';
import { ProductModel } from '@/models/product/product-model';
import { useState } from 'react';

export function ListProductLowStock({
  products,
}: {
  products: ProductModel[];
}) {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductModel[]>(products);

  const tags = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, ['Todas']);

  function handleTagClick(tag: string) {
    // Lógica para filtrar os produtos com base na tag selecionada
    setFilteredProducts(
      products.filter(
        product => product.category === tag.toLowerCase() || tag === 'Todas',
      ),
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        {tags.map(tag => (
          <button
            className="flex items-center justify-center bg-background-normal rounded-lg px-8 py-2 text-[14px]
    hover:bg-secondary-normal hover:text-white text-secondary-normal cursor-pointer transition-colors"
            onClick={() => handleTagClick(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col flex-1 gap-4 overflow-y-auto pr-1">
        {filteredProducts.map(product => {
          const stock = product.variants.reduce(
            (total, variant) => total + variant.stock,
            0,
          );

          const lowStockVariant = product.variants.filter(
            variant => variant.stock <= MINIMUM_STOCK_VARIANTS,
          );

          return (
            <CardProductLowStock
              key={product.id}
              name={product.name}
              image={product.productImage}
              stock={stock}
              minimumStock={MINIMUM_STOCK_PRODUCT}
              variants={lowStockVariant}
            />
          );
        })}
      </div>
    </>
  );
}
