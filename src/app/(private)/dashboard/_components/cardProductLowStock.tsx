import { MINIMUM_STOCK_VARIANTS } from '@/settings/variablesGlobal';
import Image from 'next/image';
import Link from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CardProductLowStockProps = {
  id: string;
  name: string;
  image: string;
  stock: number;
  variants: VariantLowStock[];
  minimumStock: number;
};

type VariantLowStock = {
  id: string;
  size: string | null;
  color: string | null;
  stock: number;
};

export function CardProductLowStock({
  name,
  image,
  variants,
  id,
}: CardProductLowStockProps) {
  const isHalfStock = variants.every(
    variant => variant.stock >= MINIMUM_STOCK_VARIANTS / 2,
  );

  return (
    <Link href={`/products/${id}`} className="w-full block border border-secondary-light/20 rounded-3xl shadow-card p-4 
      hover:bg-background-normal hover:border-secondary-light/40 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        {/* Imagem */}
        <div className="h-20 w-23 xl:h-25 xl:w-23 flex items-center justify-center rounded-xl overflow-hidden shrink-0 border border-secondary-light/20">
          <Image src={image} alt={name} className="object-cover w-full h-full" height={100} width={100} />
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-between  w-full gap-1.5 xl:gap-2 min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h5 className=" line-clamp-1 xl:text-lg text-secondary-dark font-medium">
                {name}
              </h5>
            </div>

            <div
              className={`px-[10.5px] py-[3.5px] ${isHalfStock ? 'bg-warning' : 'bg-error'}  rounded-lg flex items-center gap-1`}
            >
              <FiAlertTriangle className="text-white" />
              <span className="text-white text-sm font-medium">
                {isHalfStock ? 'Baixo' : 'Crítico'}
              </span>
            </div>
          </div>

          <span className="text-sm text-secondary-normal">
            Minimo de estoque: <strong>{MINIMUM_STOCK_VARIANTS} un.</strong>
          </span>

          
          {/* Variants */}
          <div
            className="
    flex gap-2
    overflow-x-auto
    xl:flex-wrap xl:overflow-visible
    scrollbar-none
    min-w-0
  "
          >
            {variants.map(variant => (
              <div
                key={variant.id}
                className={`py-1 px-2 flex gap-1.5 items-center shrink-0 rounded-lg
        ${MINIMUM_STOCK_VARIANTS / 2 > variant.stock
                    ? 'bg-error/10 border border-error/30'
                    : 'bg-warning/10 border border-warning/30'
                  }`}
              >
                <span className="text-sm text-secondary-dark font-medium text-nowrap">
                  {variant.size} • {variant.color}
                </span>
                <strong className="text-sm text-secondary-dark text-nowrap">
                  {variant.stock} un.
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
