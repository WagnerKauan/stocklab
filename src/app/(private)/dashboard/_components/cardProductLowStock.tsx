import { MINIMUM_STOCK_VARIANTS } from '@/settings/variablesGlobal';
import Image from 'next/image';
import { FiAlertTriangle } from 'react-icons/fi';

type CardProductLowStockProps = {
  name: string;
  image: string;
  stock: number;
  variants: VariantLowStock[];
  minimumStock: number;
};

type VariantLowStock = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

export function CardProductLowStock({
  name,
  image,
  stock,
  minimumStock,
  variants,
}: CardProductLowStockProps) {
  const progress = Math.min((stock / minimumStock) * 100, 100);

  const progressColor =
    progress > 50 ? 'bg-success' : progress > 20 ? 'bg-warning' : 'bg-error';

  const isHalfStock = variants.every(
    variant => variant.stock >= MINIMUM_STOCK_VARIANTS / 2,
  );

  return (
    <div className="w-full border border-secondary-light/20 rounded-3xl shadow-card p-4">
      <div className="flex items-center gap-4">
        {/* Imagem */}
        <div className="relative h-25 w-23 flex items-center justify-center rounded-xl overflow-hidden border border-secondary-light/20">
          <Image src={image} alt={name} className="object-cover" fill />
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-between  w-full gap-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-lg text-secondary-dark font-medium">
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

          {/* Variations */}
          <div className="flex flex-wrap gap-2">
            {variants.map(variant => (
              <div
                key={variant.id}
                className={`py-1 px-2  
              ${MINIMUM_STOCK_VARIANTS / 2 > variant.stock ? 'bg-error/10 border border-error/30' : 'bg-warning/10 border border-warning/30'}  rounded-lg`}
              >
                <span className="text-sm text-secondary-dark font-medium">
                  {variant.size} • {variant.color}
                </span>
                <strong className="text-[14px] text-secondary-dark ml-2">
                  {variant.stock} un.
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
