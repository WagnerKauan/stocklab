'use client';

import Link from 'next/link';
import { FiMoreHorizontal, FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { MovementModel } from '@/models/movements/movements-model';
import { CiFilter } from "react-icons/ci";
import Image from 'next/image';
import { Pagination } from '@/components/ui/pagination';

type ListMovementsProps = {
  movements: MovementModel[];
};

export function ListMovements({ movements }: ListMovementsProps) {
  const [filteredMovements, setFilteredMovements] = useState<MovementModel[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedPage, setSelectedPage] = useState<number | undefined>(undefined);
  const [startIndex, setStartIndex] = useState(0);
  const itensPerPage = 5;

  function filterSearch(search: string) {
    resetPagination();
    const filteredMovements = movements.filter(movement => movement.product.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredMovements(filteredMovements);
  }

  function filterSelect(type: string) {
    resetPagination();
    if (type === 'all') return setFilteredMovements(movements);
    const filteredMovements = movements.filter(movement => movement.type === type);
    setFilteredMovements(filteredMovements);
  }

  function filterDate() {
    resetPagination();
    const filteredMovements = movements.filter(movement => {
      const movementDate = new Date(movement.createdAt);
      return movementDate >= new Date(fromDate) && movementDate <= new Date(toDate);
    });
    setFilteredMovements(filteredMovements);
  }

  function resetPagination() {
    setStartIndex(0);
    setSelectedPage(1);
  }

  useEffect(() => {
    setFilteredMovements(movements);
  }, [movements]);

  return (
    <div className="flex flex-col justify-between h-full gap-8">
      {/* Filtros */}
      <div className="bg-white border border-secondary-light/20 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-secondary-dark font-medium">
            Filtros
          </h3>

          <p className="text-secondary-light text-sm">
            Refine as movimentações exibidas na tabela.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          {/* Busca */}
          <div className="flex flex-col gap-1 flex-1 min-w-70">
            <label
              htmlFor="searchMovement"
              className="text-xs text-secondary-light"
            >
              Pesquisar
            </label>

            <div className="flex h-11">
              <input
                type="search"
                id="searchMovement"
                placeholder="Pesquisar movimentação..."
                className="
            w-full
            px-3
            rounded-l-lg
            border border-secondary-light/20
            bg-background-normal
            text-sm
            text-secondary-normal
            focus:outline-none
            focus:border-primary-normal
          "
                onChange={e => filterSearch(e.target.value)}
              />

              <label
                htmlFor="searchMovement"
                className="
            px-4
            bg-secondary-dark
            rounded-r-lg
            flex items-center justify-center
            cursor-pointer
            hover:bg-secondary-dark/90
            transition-colors
          "
              >
                <FiSearch size={16} color="#FFF" />
              </label>
            </div>
          </div>

          {/* Tipo */}
          <div className="flex flex-col gap-1 min-w-45">
            <label className="text-xs text-secondary-light">
              Tipo
            </label>

            <select
              className="
          h-11
          px-3
          bg-background-normal
          border border-secondary-light/20
          rounded-lg
          text-sm
          text-secondary-normal
          focus:outline-none
          focus:border-primary-normal
        "
              onChange={e => filterSelect(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="IN">Entradas</option>
              <option value="OUT">Saídas</option>
            </select>
          </div>

          {/* Período */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-secondary-light">
              Período
            </label>

            <div className="flex items-center gap-2">
              <input
                type="date"
                className="
            h-11
            px-3
            bg-background-normal
            border border-secondary-light/20
            rounded-lg
            text-sm
            text-secondary-normal
            focus:outline-none
            focus:border-primary-normal
          "
                onChange={e => setFromDate(e.target.value)}
              />

              <span className="text-secondary-light text-sm">
                até
              </span>

              <input
                type="date"
                className="
            h-11
            px-3
            bg-background-normal
            border border-secondary-light/20
            rounded-lg
            text-sm
            text-secondary-normal
            focus:outline-none
            focus:border-primary-normal
          "
                onChange={e => setToDate(e.target.value)}
              />

              <button
                onClick={filterDate}
                className="
            h-11
            px-4
            flex items-center gap-2
            rounded-lg
            bg-primary-normal
            text-white
            hover:bg-primary-hover
            transition-colors
            cursor-pointer
          "
              >
                <CiFilter size={18} />
                <span className="text-sm font-medium">
                  Filtrar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className='flex flex-col flex-1 justify-between'>
        <div className='flex flex-col'>
          {/* header table */}
          <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_80px] gap-4 bg-primary-normal text-white rounded-xl px-6 py-4 sticky top-0 z-10">
            <span className="text-sm font-medium">Produto</span>
            <span className="text-sm font-medium">Variante</span>
            <span className="text-sm font-medium">Tipo</span>
            <span className="text-sm font-medium">Quantidade</span>
            <span className="text-sm font-medium text-center">Data</span>
            <span className="text-sm font-medium text-center">Ações</span>
          </div>

          {/* Movimentações */}
          <div className="flex flex-col gap-3 mt-3">
            {filteredMovements.slice(startIndex, startIndex + itensPerPage).map(movement => {
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
        <Pagination itensPerPage={itensPerPage} totalItens={movements.length} setStartIndex={setStartIndex} selectedPage={selectedPage} />
      </div>

    </div>
  );
}
