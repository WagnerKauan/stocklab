'use client';
import { ProductModel } from '@/models/product/product-model';
import { FiMoreHorizontal, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pagination } from '@/components/ui/pagination';

type ListProductsProps = {
  products: ProductModel[];
};

export function ListProducts({ products }: ListProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedPage, setSelectedPage] = useState<number | undefined>(
    undefined,
  );
  const [startIndex, setStartIndex] = useState(0);
  const itensPerPage = 5;

  function filterSearch(search: string) {
    resetPagination();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredProducts(filteredProducts);
  }

  function filterSelect(type: string) {
    resetPagination();
    if (type === 'all') return setFilteredProducts(products);
    const filteredProducts = products.filter(
      product => product.category === type,
    );
    setFilteredProducts(filteredProducts);
  }

  function filterSelectType(type: string) {
    resetPagination();
    if (type === 'all') return setFilteredProducts(products);
    const filteredProducts = products.filter(
      product => product.typeProduct === type,
    );
    setFilteredProducts(filteredProducts);
  }

  function resetPagination() {
    setStartIndex(0);
    setSelectedPage(1);
  }

  const typesProduct = products.reduce<string[]>((types, product) => {
    if (!types.includes(product.typeProduct)) {
      types.push(product.typeProduct);
    }
    return types;
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-4 lg:gap-8">
      {/* Filtros */}
      <div className="bg-white border border-secondary-light/20 rounded-2xl p-5">
        <div className="mb-5">
          <h3 className="text-secondary-dark font-medium">
            Filtros
          </h3>

          <p className="text-secondary-light text-sm">
            Encontre produtos rapidamente através da busca e filtros.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          {/* Busca */}
          <div className="flex flex-col gap-1 flex-1 min-w-70">
            <label
              htmlFor="searchProduct"
              className="text-xs text-secondary-light"
            >
              Pesquisar
            </label>

            <div className="flex h-10">
              <input
                type="search"
                id="searchProduct"
                placeholder="Pesquisar produto..."
                className="w-full px-3 rounded-l-lg border border-secondary-light/20 bg-background-normal
                text-sm text-secondary-normal focus:outline-none focus:border-primary-normal"
                onChange={e => filterSearch(e.target.value)}
              />

              <label
                htmlFor="searchProduct"
                className="px-4 bg-secondary-dark rounded-r-lg flex items-center justify-center cursor-pointer
                  hover:bg-secondary-dark/90 transition-colors "
              >
                <FiSearch size={16} color="#FFF" />
              </label>
            </div>
          </div>

          {/* Categoria */}

          <div className="flex flex-col gap-1 min-w-50 flex-1 sm:flex-0">
            <label
              htmlFor="category"
              className="text-xs text-secondary-light"
            >
              Categoria
            </label>

            <select
              id="category"
              className=" h-10 px-3 bg-background-normal border border-secondary-light/20
              rounded-lg text-sm text-secondary-normal focus:outline-none focus:border-primary-normal"
              onChange={e => filterSelect(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="roupas">Roupas</option>
              <option value="calcados">Calçados</option>
              <option value="acessorios">Acessórios</option>
            </select>
          </div>

          {/* Tipo */}
          <div className="flex flex-col gap-1 min-w-50 flex-1 sm:flex-0">
            <label
              htmlFor="size"
              className="text-xs text-secondary-light"
            >
              Tipo
            </label>

            <select
              id="size"
              className="h-10 px-3 bg-background-normal border border-secondary-light/20 rounded-lg
                  text-sm text-secondary-normal focus:outline-none focus:border-primary-normal "
              onChange={e => filterSelectType(e.target.value)}
            >
              <option value="all">Todos</option>

              {typesProduct.map(type => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="flex-1 h-full flex flex-col justify-between">
        {/* Header - desktop */}

        <div className='flex flex-col'>
          <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_80px] gap-4 bg-primary-normal text-white rounded-xl px-6 py-4">
            <span className="text-sm font-medium">Produto</span>
            <span className="text-sm font-medium">Categoria</span>
            <span className="text-sm font-medium">Estoque</span>
            <span className="text-sm font-medium">Variações</span>
            <span className="text-sm font-medium text-center">Ações</span>
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-3 mt-3 ">
            {filteredProducts
              .slice(startIndex, startIndex + itensPerPage)
              .map(product => {
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
                        <Link
                          className="cursor-pointer"
                          href={`/products/${product.id}`}
                        >
                          <FiMoreHorizontal
                            size={20}
                            className="text-secondary-dark hover:text-primary-normal transition-colors"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col gap-4 md:hidden">
                      <div className="flex items-center justify-between gap-3">
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

                        <button className="cursor-pointer shrink-0">
                          <FiMoreHorizontal
                            size={20}
                            className="text-secondary-dark"
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
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


        <Pagination
          itensPerPage={itensPerPage}
          totalItens={filteredProducts.length}
          setStartIndex={setStartIndex}
          selectedPage={selectedPage}
        />
      </div>
    </div>
  );
}
