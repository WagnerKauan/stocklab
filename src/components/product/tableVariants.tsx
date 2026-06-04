'use client';
import { ProductVariant } from '@/models/product/product-model';
import { formatCurrencyInput } from '@/utils/formatPrice';
import { useCallback, useEffect } from 'react';
import type { ErrorInput } from './formProduct';
import { v4 as uuidv4 } from 'uuid';
import { sanitizeNumberInput } from '@/utils/sanitizeNumberInput';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HiArrowsRightLeft } from 'react-icons/hi2';

type VariationsTableProps = {
  existingVariants: ProductVariant[];
  variants: ProductVariant[];
  errors: ErrorInput[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  handleOnBlur: (field: string, value: string | number, id?: string) => boolean;
  setErrors: React.Dispatch<React.SetStateAction<ErrorInput[]>>;
};

const empty = (): ProductVariant => ({
  id: uuidv4(),
  size: '',
  color: '',
  stock: 0,
  priceInCents: 0,
  sku: '',
});

export function VariationsTable({
  errors,
  variants,
  existingVariants,
  setErrors,
  setVariants,
  handleOnBlur,
}: VariationsTableProps) {
  const update = useCallback(
    (i: number, field: keyof ProductVariant, value: string | number) => {
      //Aqui eu transforma o valor para número
      if (field === 'priceInCents' || field === 'stock')
        value = sanitizeNumberInput(value, 6);

      setVariants(prev =>
        prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)),
      );
    },
    [],
  );

  const addRow = () => setVariants(prev => [...prev, empty()]);

  const removeRow = (i: number) =>
    setVariants(prev =>
      prev.length === 1 ? [empty()] : prev.filter((_, idx) => idx !== i),
    );

  const fildNames = ['size', 'color', 'stock', 'priceInCents'];
  const errorsForm = errors.filter(err => fildNames.includes(err.field));

  function handleOnblurVariant(
    idRow: string,
    field: string,
    value: string | number,
  ) {
    if (field === 'priceInCents' || field === 'stock')
      value = sanitizeNumberInput(value);
    handleOnBlur(field, value, idRow);
  }

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Desktop */}

      <div className="hidden md:block border border-secondary-light/20 rounded-xl flex-1 overflow-y-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-[#4A7CF7]">
            <tr>
              <th className="text-left text-[13px] font-medium text-white px-4 py-3">
                Tamanho
              </th>
              <th className="text-left text-[13px] font-medium text-white px-4 py-3">
                Cor
              </th>

              <th className="text-left text-[13px] font-medium text-white px-4 py-3 w-28">
                Estoque
              </th>

              <th className="text-right text-[13px] font-medium text-white px-4 py-3 w-32">
                Preço
              </th>
              <th className="w-11" />
            </tr>
          </thead>
          <tbody>
            {variants.map((v, i) => {
              const cell = errors.filter(err => err.id === v.id);

              const existingVariant = existingVariants.find(
                ev => ev.id === v.id,
              );

              return (
                <tr
                  key={i}
                  className="border-b border-secondary-light/15 last:border-b-0 hover:bg-background-normal/50 transition-colors"
                >
                  {/* Size */}
                  <td className="px-4 py-1.5">
                    <input
                      className={`w-full py-1.5 text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary
                    ${cell.some(err => err.field === 'size') ? 'border-b border-b-error' : 'border-none'}  
                  `}
                      type="text"
                      placeholder="Ex: M"
                      value={v.size || ''}
                      onChange={e => update(i, 'size', e.target.value)}
                      onBlur={e =>
                        handleOnblurVariant(v.id, 'size', e.target.value)
                      }
                    />
                  </td>

                  {/* Color */}
                  <td className="px-4 py-1.5">
                    <input
                      className={`w-full  py-1.5 text-sm bg-transparent outline-none text-primary placeholder:text-tertiary
                    ${cell.some(err => err.field === 'color') ? 'border-b border-b-error' : 'border-none'}
                    `}
                      type="text"
                      placeholder="Ex: Preto"
                      value={v.color || ''}
                      onChange={e => update(i, 'color', e.target.value)}
                      onBlur={e =>
                        handleOnblurVariant(v.id, 'color', e.target.value)
                      }
                    />
                  </td>

                  {/* Stock */}

                  <td className="px-4 py-1.5 ">
                    {existingVariant !== undefined && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className=" w-full py-1.5 text-sm text-primary-normal cursor-not-allowed opacity-60 block"
                          >
                            {v.stock}
                          </span>
                        </TooltipTrigger>

                        <TooltipContent
                          side="top"
                          className="flex items-center gap-2 rounded-xl border border-secondary-light/10  bg-secondary-dark
                          px-3 py-2 text-xs text-white shadow-lg"
                        >
                          <HiArrowsRightLeft className="size-3.5 shrink-0 text-primary-normal" />

                          <div className="flex flex-col">
                            <span className="font-medium">
                              Estoque protegido
                            </span>

                            <span className="text-white/70">
                              Altere através das movimentações.
                            </span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {!existingVariant && (
                      <input
                        className={`w-full py-1.5 text-sm bg-transparent outline-none text-primary 
                      placeholder:text-tertiary disabled:cursor-not-allowed disabled:opacity-50
                    ${cell.some(err => err.field === 'stock') ? 'border-b border-b-error' : 'border-none'}  
                  `}
                        type="text"
                        placeholder="estoque"
                        value={v.stock || ''}
                        onChange={e =>
                          update(
                            i,
                            'stock',
                            e.target.value.replace(/[^0-9]/g, ''),
                          )
                        }
                        onBlur={e =>
                          handleOnblurVariant(v.id, 'stock', e.target.value)
                        }
                      />
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-1.5 text-right">
                    <input
                      className={`w-full py-1.5 text-sm bg-transparent outline-none text-primary placeholder:text-tertiary text-right
                    ${cell.some(err => err.field === 'priceInCents') ? 'border-b border-b-error' : 'border-none'} 
                  `}
                      type="text"
                      placeholder="Preço"
                      value={formatCurrencyInput(v.priceInCents).formatted}
                      onChange={e => {
                        update(i, 'priceInCents', e.target.value);
                      }}
                      onBlur={e =>
                        handleOnblurVariant(
                          v.id,
                          'priceInCents',
                          e.target.value,
                        )
                      }
                    />
                  </td>

                  <td className="px-2 text-center">
                    <button
                      onClick={() => {
                        (removeRow(i),
                          setErrors(prev =>
                            prev.filter(err => err.id !== v.id),
                          ));
                      }}
                      className="w-7 h-7 rounded-md text-tertiary hover:text-red-500 hover:bg-red-50 transition-colors text-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      {/* <div className="md:hidden border border-secondary-light/20 rounded-xl overflow-hidden">
      <div className="bg-[#4A7CF7] flex px-4 py-3">
        <span className="flex-1 text-[13px] font-medium text-white">
          Tamanho / Cor
        </span>
        <span className="text-[13px] font-medium text-white">Ações</span>
      </div>
      {variants.map((v, i) => (
        <div
          key={i}
          className="border-b border-secondary-light/15 last:border-b-0"
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <input
              className="w-20 text-sm font-medium bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
              type="text"
              placeholder="Tam."
              value={v.size}
              onChange={e => update(i, 'size', e.target.value)}
            />
            <input
              className="flex-1 text-sm text-secondary bg-transparent border-none outline-none placeholder:text-tertiary"
              type="text"
              placeholder="Cor"
              value={v.color}
              onChange={e => update(i, 'color', e.target.value)}
            />
            <button
              onClick={() => removeRow(i)}
              className="w-7 h-7 rounded-md text-tertiary hover:text-red-500 hover:bg-red-50 transition-colors text-sm shrink-0"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-4 px-4 pb-3">
            <div className="flex-1">
              <span className="text-[11px] text-tertiary block mb-0.5">
                Estoque
              </span>
              <input
                className="w-full text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
                type="text"
                placeholder="0"
                value={v.stock}
                onChange={e => update(i, 'stock', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <span className="text-[11px] text-tertiary block mb-0.5">
                Preço
              </span>
              <input
                className="w-full text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
                type="text"
                placeholder="0,00"
                value={v.priceInCents}
                onChange={e => update(i, 'priceInCents', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div> */}

      <div
        className={`flex items-center ${errorsForm.length > 0 ? 'justify-between' : 'justify-end'}`}
      >
        {errorsForm.length > 0 && (
          <span className="text-error text-sm">{errorsForm[0].message}</span>
        )}

        <button
          onClick={addRow}
          className="flex items-center cursor-pointer gap-1.5 px-5 py-2.5 text-[13px] font-medium bg-[#1C2A4A] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <span className="text-base leading-none">+</span> Variação
        </button>
      </div>
    </div>
  );
}
