import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import Link from 'next/link';
import { FiPackage, } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { ListProducts } from './_components/listProducts';
import { findAllProductsChached } from '@/lib/queries/product';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';

export default async function Products() {
  const user = await getCurrentUser();

  if (!user) return redirect('/login');

  const products = await findAllProductsChached(user.id);

  return (
    <CardMain>
      <div className="flex flex-col h-full gap-6 lg:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TitleSection
            title="Lista de produtos"
            icon={<FiPackage size={32} color="#FFF" />}
            paragrafo="Confira a lista de todos produtos cadastrados"
            typeTitle="info"
          />

          <Link
            href={'/products/newProduct'}
            className="py-2.5 px-6 bg-primary-normal hover:bg-primary-hover text-sm flex items-center gap-1.5 self-end
            transition-all rounded-xl cursor-pointer text-white font-semibold shadow-sm hover:shadow focus:outline-none"
          >
            <div className="flex items-center justify-center gap-1">
              <FiPlus size={18} className="text-white shrink-0"  />
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
