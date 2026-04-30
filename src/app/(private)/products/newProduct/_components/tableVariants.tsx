'use client';
import { useState, useCallback } from 'react';

type Variant = { size: string; color: string; stock: string; price: string };
const empty = (): Variant => ({ size: '', color: '', stock: '', price: '' });

function formatPrice(val: string) {
  const n = parseFloat(val.replace(',', '.'));
  return isNaN(n) ? val : n.toFixed(2).replace('.', ',');
}

export function VariationsTable() {
  const [variants, setVariants] = useState<Variant[]>([
    { size: 'GG', color: 'Branco', stock: '120', price:  '90,00' },
  ]);

  const update = useCallback(
    (i: number, field: keyof Variant, value: string) => {
      setVariants(prev =>
        prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)),
      );
    },
    [],
  );

  const handleBlurPrice = useCallback((i: number, value: string) => {
    const fmt = formatPrice(value);
    setVariants(prev =>
      prev.map((v, idx) => (idx === i ? { ...v, price: fmt } : v)),
    );
  }, []);

  const addRow = () => setVariants(prev => [...prev, empty()]);
  const removeRow = (i: number) =>
    setVariants(prev =>
      prev.length === 1 ? [empty()] : prev.filter((_, idx) => idx !== i),
    );

  return (
    <div className="flex flex-col gap-3">
      {/* Desktop */}
      <div className="hidden md:block border border-secondary-light/20 rounded-xl overflow-hidden">
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
            {variants.map((v, i) => (
              <tr
                key={i}
                className="border-b border-secondary-light/15 last:border-b-0 hover:bg-background-normal/50 transition-colors"
              >
                <td className="px-4 py-1.5">
                  <input
                    className="w-full py-1.5 text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
                    type="text"
                    placeholder="Ex: M"
                    value={v.size}
                    onChange={e => update(i, 'size', e.target.value)}
                  />
                </td>
                <td className="px-4 py-1.5">
                  <input
                    className="w-full py-1.5 text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
                    type="text"
                    placeholder="Ex: Preto"
                    value={v.color}
                    onChange={e => update(i, 'color', e.target.value)}
                  />
                </td>
                <td className="px-4 py-1.5">
                  <input
                    className="w-full py-1.5 text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary"
                    type="text"
                    placeholder="0"
                    value={v.stock}
                    onChange={e => update(i, 'stock', e.target.value)}
                  />
                </td>
                <td className="px-4 py-1.5 text-right">
                  <input
                    className="w-full py-1.5 text-sm bg-transparent border-none outline-none text-primary placeholder:text-tertiary text-right"
                    type="text"
                    placeholder="0,00"
                    value={v.price}
                    onChange={e => update(i, 'price', e.target.value)}
                    onBlur={e => handleBlurPrice(i, e.target.value)}
                  />
                </td>
                <td className="px-2 text-center">
                  <button
                    onClick={() => removeRow(i)}
                    className="w-7 h-7 rounded-md text-tertiary hover:text-red-500 hover:bg-red-50 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden border border-secondary-light/20 rounded-xl overflow-hidden">
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
                  value={v.price}
                  onChange={e => update(i, 'price', e.target.value)}
                  onBlur={e => handleBlurPrice(i, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-medium bg-[#1C2A4A] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <span className="text-base leading-none">+</span> Variação
        </button>
      </div>
    </div>
  );
}
