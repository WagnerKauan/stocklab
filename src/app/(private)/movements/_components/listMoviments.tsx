'use client';

import Link from 'next/link';
import { FiMoreHorizontal, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { MovementModel } from '@/models/movements/movements-model';
import Image from 'next/image';

type ListMovementsProps = {
  movements: MovementModel[];
};

export function ListMovements({ movements }: ListMovementsProps) {
  const [filteredMovements, setFilteredMovements] = useState(movements);

  return (
    <div className="mt-8">
      {/* Filtros */}
      <div className="flex items-center justify-between mb-6">
        {/* Busca */}
        <div className="flex max-w-sm h-10 w-full">
          <input
            type="search"
            id="searchMovement"
            placeholder="Pesquisar movimentação..."
            className="w-full p-3 rounded-l-lg bg-background-normal outline-none focus:border border-secondary-light/20 group"
          />
          <label
            htmlFor="searchMovement"
            className="p-3 bg-secondary-dark rounded-r-lg flex items-center hover:bg-secondary-dark/80 transition-colors
                      justify-center cursor-pointer flex-1 border border-secondary-dark "
          >
            <FiSearch size={16} color="#FFF" />
          </label>
        </div>
        <div className="flex items-center gap-6 w-full max-w-125 pr-4">
          {/* Select tipo */}
          <select
            className="bg-background-normal border border-secondary-light/20 text-secondary-normal text-sm 
            rounded-lg focus:ring-primary-normal focus:border-primary-normal block w-full p-2.5"
          >
            <option value="all">Todos</option>
            <option value="IN">Entradas</option>
            <option value="OUT">Saídas</option>
          </select>
          {/* Data */}
          <input type="date" className="bg-background-normal border border-secondary-light/20 text-secondary-normal text-sm rounded-lg focus:ring-primary-normal focus:border-primary-normal block w-full p-2.5" />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_80px] gap-4 bg-primary-normal text-white rounded-xl px-6 py-4 sticky top-0 z-10">
        <span className="text-sm font-medium">Produto</span>
        <span className="text-sm font-medium">Variante</span>
        <span className="text-sm font-medium">Tipo</span>
        <span className="text-sm font-medium">Quantidade</span>
        <span className="text-sm font-medium text-center">Data</span>
        <span className="text-sm font-medium text-center">Ações</span>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        {filteredMovements.map(movement => {
          const { product } = movement;
          const { variant } = movement;
          return (
            <div
              key={product.id}
              className="bg-white border border-secondary-light/20 rounded-2xl p-4 transition-colors hover:bg-background-normal"
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_80px] gap-4 items-center">
                {/* Produto */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={
                        product.productImage ||
                        '/product/placeHolderProduct.png'
                      }
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

                {/* Variante */}
                <span className="text-secondary-dark">
                  {variant.size}/{variant.color}
                </span>

                {/* Tipo */}
                <span className="font-medium text-secondary-dark flex items-center gap-1">
                  {movement.type === 'IN' ? (
                    <div className="w-3 h-3 bg-success rounded-full" />
                  ) : (
                    <div className="w-3 h-3 bg-error rounded-full" />
                  )}
                  {movement.type === 'IN' ? 'Entrada' : 'Saída'}
                </span>

                {/* Quantidade */}
                <span className="text-secondary-dark flex items-center gap-1">
                  {movement.type === 'IN' ? '+' : '-'}
                  {movement.quantity} unidades
                </span>

                {/* Data */}
                <div className="flex justify-center">
                  {movement.createdAt.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>

                {/* Ações */}
                <div className="flex justify-center">
                  <Link
                    className="cursor-pointer"
                    href={`/products/${product.id}?variantId=${variant.id}`}
                  >
                    <FiMoreHorizontal
                      size={20}
                      className="text-secondary-dark hover:text-primary-normal transition-colors"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
