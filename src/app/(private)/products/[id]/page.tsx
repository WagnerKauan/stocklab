'use server';

import { ClipboardIcon } from '@/components/icons/clipboardIcon';
import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import Image from 'next/image';
import { FiDollarSign, FiEdit2, FiTag } from 'react-icons/fi';
import { CardInfo } from './_components/cardInfo';
import { VariantIcon } from '@/components/icons/variantIcon';
import { StockIcon } from '@/components/icons/stockIcon';
import { MINIMUM_STOCK_VARIANTS } from '@/settings/variablesGlobal';
import Link from 'next/link';
import { formatCurrencyInput } from '@/utils/formatPrice';
import { findProductByIdChached } from '@/lib/queries/product';
import { sortVariants } from '@/utils/sizeOrder';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ variantId?: string }>;
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) return redirect('/login');

  const { variantId } = await searchParams;

  const { id } = await params;

  const product = await findProductByIdChached(id, user.id);

  if (!product) {
    return <CardMain>Product not found</CardMain>;
  }

  product.variants = sortVariants(product.variants);

  const productStock = product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  );

  const [minPrice, maxPrice] = product.variants.reduce(
    ([min, max], variant) => [
      Math.min(min, variant.priceInCents),
      Math.max(max, variant.priceInCents),
    ],
    [Infinity, -Infinity],
  );

  const tags = [
    {
      tag: 'Categoria',
      value: product.category,
      icon: <FiTag size={20} color="#FFF" />,
    },
    {
      tag: 'Variações',
      value: product.variants.length.toString(),
      icon: <VariantIcon size={20} color="#FFF" />,
      bgColor: 'bg-secondary-light',
    },
    {
      tag: 'Estoque',
      value: productStock.toString(),
      icon: <StockIcon size={20} color="#FFF" />,
      bgColor: 'bg-secondary-dark',
    },
    {
      tag: 'Preço',
      value: `${formatCurrencyInput(minPrice).formatted} - ${formatCurrencyInput(maxPrice).formatted}`,
      icon: <FiDollarSign size={20} color="#FFF" />,
      bgColor: 'bg-success',
    },
  ];

  const colorStatus = {
    critico: 'bg-error',
    baixo: 'bg-warning',
    normal: 'bg-success',
  };

  return (
    <CardMain>
      <div className="flex items-center justify-between">
        <TitleSection
          icon={<ClipboardIcon size={32} color="#FFF" />}
          title="Informações do produto"
          paragrafo="Confira todas informações do produto para ficar alinhado"
          typeTitle="info"
        />
        <Link
          href={`/products/${id}/edit`}
          className="flex items-center cursor-pointer gap-1.5 px-8 py-2
          bg-primary-normal text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiEdit2 size={20} color="#FFF" />
          Editar produto
        </Link>
      </div>

      <div className="flex gap-8 mt-8">
        <div className="w-100 h-125 rounded-2xl overflow-hidden shadow-card ">
          <Image
            src={product.productImage || '/product/placeHolderProduct.png'}
            alt={product.name}
            className="object-cover h-full w-full"
            priority
            width={400}
            height={500}
          />
        </div>

        <div className=" flex-1 flex flex-col gap-8">
          <h1 className="text-[39px] text-secondary-dark ">{product.name}</h1>

          <div className="grid grid-cols-4 gap-8">
            {tags.map((tag, index) => (
              <CardInfo
                key={index}
                icon={tag.icon}
                tag={tag.tag}
                value={tag.value}
                bgColor={tag.bgColor}
              />
            ))}
          </div>

          <div className="border border-secondary-light/20 rounded-xl overflow-y-auto h-full">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-primary-normal">
                <tr>
                  <th className="text-center text-[13px] font-medium text-white px-4 py-3">
                    Tamanho
                  </th>
                  <th className="text-center text-[13px] font-medium text-white px-4 py-3">
                    Cor
                  </th>
                  <th className="text-center text-[13px] font-medium text-white px-4 py-3">
                    Estoque
                  </th>
                  <th className="text-center text-[13px] font-medium text-white px-4 py-3">
                    Status
                  </th>
                  <th className="text-center text-[13px] font-medium text-white px-4 py-3">
                    Preço
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.variants.map(variant => {
                  const variantStatus =
                    variant.stock < MINIMUM_STOCK_VARIANTS / 2
                      ? 'critico'
                      : variant.stock < MINIMUM_STOCK_VARIANTS
                        ? 'baixo'
                        : 'normal';

                  return (
                    <tr
                      key={variant.id}
                      className={`border-b border-secondary-light/15 last:border-b-0 
                        hover:bg-background-normal/50 transition-colors ${variantId === variant.id ? 'bg-secondary-light/20' : ''}`}
                    >
                      <td className="text-center py-1.5">
                        <span className="text-sm text-primary">
                          {variant.size}
                        </span>
                      </td>

                      <td className="text-center p-1.5">
                        <span>{variant.color}</span>
                      </td>

                      <td className="text-center py-1.5">
                        <span>{variant.stock}</span>
                      </td>

                      <td className=" flex items-center text-center justify-center py-1.5">
                        <span
                          className={` ${colorStatus[variantStatus]} py-1 w-full max-w-20 text-sm text-center  text-white rounded-lg  gap-1`}
                        >
                          {variantStatus}
                        </span>
                      </td>

                      <td className="text-center py-1.5">
                        <span>
                          {formatCurrencyInput(variant.priceInCents).formatted}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CardMain>
  );
}
