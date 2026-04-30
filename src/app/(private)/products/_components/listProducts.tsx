'use client';
import { ProductModel } from '@/models/product/product-model';
import { FiMoreHorizontal, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';

type ListProductsProps = {
  products: ProductModel[];
};

export function ListProducts({ products }: ListProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div className="border border-secondary-light/20 rounded-3xl shadow-card p-6 flex flex-col flex-1 h-full overflow-hidden mt-8">
      {/* Filtros */}
      <div className="flex items-center justify-between mb-6">
        {/* Busca */}
        <div className="flex max-w-sm h-10 w-full">
          <input
            type="search"
            id="searchProduct"
            placeholder="Pesquisar produto..."
            className="w-full p-3 rounded-l-lg bg-background-normal text-secondary-normal focus:outline-secondary-light/20"
          />
          <label
            htmlFor="searchProduct"
            className="p-3 bg-secondary-dark rounded-r-lg flex items-center hover:bg-secondary-dark/80 transition-colors
                justify-center cursor-pointer flex-1 border border-secondary-dark"
          >
            <FiSearch size={16} color="#FFF" />
          </label>
        </div>
        <div className="flex items-center gap-6 w-full max-w-125 pr-4">
          {/* Select Categoria */}
          <select
            id="category"
            className="bg-background-normal border border-secondary-light/20 text-secondary-normal text-sm rounded-lg focus:ring-primary-normal focus:border-primary-normal block w-full p-2.5"
          >
            <option value="all">Categoria</option>
            <option value="camisa">Camisa</option>
            <option value="blusa">Blusa</option>
            <option value="calca">Calça</option>
          </select>
          {/* Select Tamanho */}
          <select
            id="size"
            className="bg-background-normal border border-secondary-light/20 text-secondary-normal text-sm rounded-lg focus:ring-primary-normal focus:border-primary-normal block w-full p-2.5"
          >
            <option value="all">Tamanho</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="XL">XL</option>
          </select>
        </div>
      </div>

      {/* Tabela de Produtos */}

      <div className="flex-1 h-full overflow-y-auto pr-2">
        {/* Header - desktop */}
        
        <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_80px] gap-4 bg-primary-normal text-white rounded-xl px-6 py-4 sticky top-0 z-10">
          <span className="text-sm font-medium">Produto</span>
          <span className="text-sm font-medium">Categoria</span>
          <span className="text-sm font-medium">Estoque</span>
          <span className="text-sm font-medium">Variações</span>
          <span className="text-sm font-medium text-center">Ações</span>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-3 mt-3">
          {filteredProducts.map(product => {
            const stock = product.variants.reduce((totalStock, variant) => {
              return totalStock + variant.stock;
            }, 0);

            return (
              <div
                key={product.id}
                className="bg-white border border-secondary-light/20 rounded-2xl p-4 transition-colors hover:bg-background-normal"
              >
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_80px] gap-4 items-center">
                  {/* Produto */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={product.productImage}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-secondary-dark truncate">
                        {product.name}
                      </span>

                      <span className="text-sm text-secondary-light truncate">
                        SKU: AC-TESTE-CAMISA
                      </span>
                    </div>
                  </div>

                  {/* Categoria */}
                  <span className="text-secondary-dark truncate">
                    {product.category}
                  </span>

                  {/* Estoque */}
                  <span className="font-medium text-secondary-dark">
                    {stock} unidades
                  </span>

                  {/* Variações */}
                  <span className="text-secondary-dark">
                    {product.variants.length} variações
                  </span>

                  {/* Ações */}
                  <div className="flex justify-center">
                    <button className="cursor-pointer">
                      <FiMoreHorizontal
                        size={20}
                        className="text-secondary-dark hover:text-primary-normal transition-colors"
                      />
                    </button>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex flex-col gap-4 md:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={product.productImage}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-secondary-dark truncate">
                          {product.name}
                        </span>

                        <span className="text-sm text-secondary-light truncate">
                          SKU: AC-TESTE-CAMISA
                        </span>
                      </div>
                    </div>

                    <button className="cursor-pointer shrink-0">
                      <FiMoreHorizontal
                        size={20}
                        className="text-secondary-dark"
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-secondary-light block">
                        Categoria
                      </span>
                      <span className="text-secondary-dark font-medium">
                        {product.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-secondary-light block">
                        Estoque
                      </span>
                      <span className="text-secondary-dark font-medium">
                        {stock} unidades
                      </span>
                    </div>

                    <div>
                      <span className="text-secondary-light block">
                        Variações
                      </span>
                      <span className="text-secondary-dark font-medium">
                        {product.variants.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
