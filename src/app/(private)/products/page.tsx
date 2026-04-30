import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import { productRepository } from '@/repository/product';
import Image from 'next/image';
import Link from 'next/link';
import { FiMoreHorizontal, FiPackage, FiSearch } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { ListProducts } from './_components/listProducts';

export default async function Products() {
  const products = await productRepository.findAll();

  return (
    <CardMain>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <TitleSection
            title="Lista de produtos"
            icon={<FiPackage size={32} color="#FFF" />}
            paragrafo="Confira a lista de todos produtos cadastrados"
            typeTitle="info"
          />

          <Link
            href={'/products/newProduct'}
            className="py-2 px-8 bg-primary-normal hover:bg-primary-hover transition-colors rounded-lg block"
          >
            <div className="flex items-center justify-center gap-1">
              <FiPlus size={24} color="#FFF" />
              <span className="text-white">Novo produto</span>
            </div>
          </Link>
        </div>

        {/* Conteudo */}
        <ListProducts products={products} />
      </div>
    </CardMain>
  );
}
