'use client';

import {
  MINIMUM_STOCK_PRODUCT,
  MINIMUM_STOCK_VARIANTS,
} from '@/settings/variablesGlobal';
import { CardProductLowStock } from './cardProductLowStock';
import { ProductModel } from '@/models/product/product-model';
import { useEffect, useState } from 'react';
import { LowStockEmptyState } from './lowStockEmptyState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { MoveTypesProduct } from './moveTypesProduct';
import { Pagination } from '@/components/ui/pagination';


export function ListProductLowStock({
  products,
}: {
  products: ProductModel[];
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [typeActive, setTypeActive] = useState('Todos');
  const itensPerPage = 3;
  const [filteredProducts, setFilteredProducts] =
    useState<ProductModel[]>(products);

  const typeProducts = products.reduce<string[]>(
    (acc, product) => {
      if (!acc.includes(product.typeProduct)) {
        acc.push(product.typeProduct);
      }
      return acc;
    },
    ['Todos'],
  );

  function handleTypeClick(type: string) {
    setTypeActive(type);
    if (type === 'Todos') return setFilteredProducts(products);
    if (filteredProducts.length < products.length) {
      setStartIndex(0);
    }
    setFilteredProducts(
      products.filter(
        product => product.typeProduct === type,
      ),
    );
  }

  function filterSelectCategory(category: string) {
    if (filteredProducts.length < products.length) setFilteredProducts(products);
    if (typeActive) {
      setTypeActive('');
    }
    if (category === 'all') return setFilteredProducts(products);
    const categoryProducts = products.filter(product => product.category === category);
    setFilteredProducts(categoryProducts);
  }


  const router = useRouter();
  const pathname = usePathname();
  const success = useSearchParams().get('success');

  useEffect(() => {
    if (success === 'authenticated') {
      toast.success('Bem-vindo!');
      router.replace(pathname);
    }
  }, [success]);

  return (
    <div className=' flex flex-col justify-between h-full gap-4'>
      <div className='flex flex-col lg:flex-row items-end lg:items-center gap-4 justify-between border-y py-4 border-secondary-light/20'>
        <MoveTypesProduct typeProducts={typeProducts} typeClick={handleTypeClick} typeActive={typeActive} />

        <select
          name="category"
          id="category"
          className="bg-background-normal border border-secondary-light/20 text-secondary-normal text-sm 
            rounded-lg focus:ring-primary-normal focus:border-primary-normal p-2.5 hidden lg:block"
          onChange={e => filterSelectCategory(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="roupas">Roupas</option>
          <option value="calcados">Calçados</option>
          <option value="assesorios">Acessórios</option>
        </select>

      </div>

      <div className="flex flex-col flex-1 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(startIndex, startIndex + itensPerPage).map(product => {
            const stock = product.variants.reduce(
              (total, variant) => total + variant.stock,
              0,
            );

            const lowStockVariant = product.variants.filter(
              variant => variant.stock <= MINIMUM_STOCK_VARIANTS,
            );

            return (
              <CardProductLowStock
                id={product.id}
                key={product.id}
                name={product.name}
                image={
                  product.productImage || '/product/placeHolderProduct.png'
                }
                stock={stock}
                minimumStock={MINIMUM_STOCK_PRODUCT}
                variants={lowStockVariant}
              />
            );
          })

        ) : (
          <LowStockEmptyState />
        )}

        
      </div>
      
      <div className="flex justify-center">
          <Pagination
            itensPerPage={itensPerPage}
            totalItens={filteredProducts.length}
            setStartIndex={setStartIndex} />

        </div>
    </div>
  );
}
