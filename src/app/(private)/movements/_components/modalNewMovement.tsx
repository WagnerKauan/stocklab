'use client';

import { actionFindAllProducts } from '@/actions/movements/action-findAll-products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { ProductModel } from '@/models/product/product-model';
import { useEffect, useState } from 'react';
import { FiPlus, FiTag, FiLayers, FiCheck, FiInfo } from 'react-icons/fi';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { cn } from '@/lib/utils';

export function ModalNewMovement() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [movement, setMovement] = useState({
    productId: '',
    variantId: '',
    type: '',
    quantity: 0,
  });

  function handleChange(field: string, value: string | number) {
    setMovement({
      ...movement,
      [field]: value,
    });
  }

  async function findProducts() {
    const response = await actionFindAllProducts();
    setProducts(response);
  }

  function resetForm() {
    setMovement({
      productId: '',
      variantId: '',
      type: '',
      quantity: 0,
    });
  }

  async function handleSubmit() {
    console.log(movement);
  }

  useEffect(() => {
    findProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const selectedProduct = products.find(p => p.id === movement.productId);

  return (
    <Dialog onOpenChange={() => resetForm()}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="py-2.5 px-6 bg-primary-normal hover:bg-primary-hover 
            transition-all rounded-xl cursor-pointer text-white font-semibold text-sm flex items-center gap-1.5 shadow-sm hover:shadow focus:outline-none"
        >
          <FiPlus size={18} className="text-white shrink-0" />
          Nova movimentação
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 gap-0 rounded-3xl">
        <DialogHeader className="flex flex-row items-center gap-4 pb-4 border-b border-secondary-light/10">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl border border-blue-100 shrink-0">
            <HiArrowsRightLeft className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-lg font-bold text-secondary-dark leading-tight">
              Nova movimentação
            </DialogTitle>
            <DialogDescription className="text-secondary-light text-xs font-medium">
              Registre a entrada ou saída de produtos do seu estoque.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-5">
          {/* Tipo de Movimentação */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-light">
              Tipo da movimentação
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('type', 'IN')}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-semibold text-sm transition-all cursor-pointer focus:outline-none",
                  movement.type === 'IN'
                    ? "border-success bg-success/5 text-success shadow-xs shadow-success/10"
                    : "border-secondary-light/20 bg-white text-secondary-normal hover:bg-secondary-light/5"
                )}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
                Entrada
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'OUT')}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-semibold text-sm transition-all cursor-pointer focus:outline-none",
                  movement.type === 'OUT'
                    ? "border-error bg-error/5 text-error shadow-xs shadow-error/10"
                    : "border-secondary-light/20 bg-white text-secondary-normal hover:bg-secondary-light/5"
                )}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                Saída
              </button>
            </div>
          </div>

          {/* Produto */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary-light">
              Produto
            </label>
            <Select
              value={movement.productId}
              onValueChange={(value) => {
                handleChange('productId', value);
              }}
            >
              <SelectTrigger className="w-full h-11 border-secondary-light/20 bg-white hover:bg-secondary-light/5 text-secondary-dark rounded-xl transition-all">
                <div className="flex items-center gap-2">
                  {!movement.productId && (
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-bold border border-blue-100 shrink-0">
                      P
                    </div>
                  )}
                  <SelectValue placeholder="Selecione um produto" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-secondary-light/10">
                        {product.productImage ? (
                          <img
                            src={product.productImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-normal/10 text-primary-normal flex items-center justify-center text-[10px] font-bold">
                            {product.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-secondary-dark">{product.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Variante */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary-light">
              Variante
            </label>
            <Select
              value={movement.variantId}
              onValueChange={(value) => handleChange('variantId', value)}
              disabled={!movement.productId}
            >
              <SelectTrigger className="w-full h-11 border-secondary-light/20 bg-white hover:bg-secondary-light/5 disabled:bg-secondary-light/5 disabled:text-secondary-light/50 text-secondary-dark rounded-xl transition-all">
                <div className="flex items-center gap-2">
                  <FiTag className="text-secondary-light/80 size-4 shrink-0" />
                  <SelectValue placeholder="Selecione a variante" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {selectedProduct?.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    <span className="text-secondary-dark font-medium">
                      {variant.size && variant.color
                        ? `${variant.size} / ${variant.color}`
                        : variant.size || variant.color || 'Sem tamanho/cor'}
                      <span className="text-secondary-light font-normal text-xs ml-2">
                        (Estoque: {variant.stock})
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!movement.productId && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warning/10 text-warning border 
                border-warning/20 text-xs font-semibold w-full mt-1 animate-in fade-in duration-200">
                <FiInfo className="size-4 shrink-0" />
                <span>Selecione um produto primeiro</span>
              </div>
            )}
          </div>

          {/* Quantidade */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary-light">
              Quantidade
            </label>
            <div className="relative flex items-center">
              <FiLayers className="absolute left-3 text-secondary-light/80 size-4 pointer-events-none" />
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="0"
                value={movement.quantity || ''}
                onChange={(e) => {
                  if(Number(e.target.value) < 0) return;
                  handleChange('quantity', Number(e.target.value));
                }}
                className="w-full pl-9 pr-16 h-11 rounded-xl bg-white border border-secondary-light/20 focus:border-primary-normal focus:ring-2 focus:ring-primary-normal/20 transition-all outline-none text-secondary-dark text-sm font-semibold"
              />
              <div className="absolute right-2 top-1.5 flex items-center pointer-events-none select-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-light bg-secondary-light/10 px-2 py-1.5 rounded-lg border border-secondary-light/5">
                  unid.
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-secondary-light/10 flex flex-row items-center justify-end gap-3">
          <DialogClose asChild onClick={resetForm}>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-secondary-light/20 text-secondary-normal font-semibold text-sm hover:bg-secondary-light/5 transition-all cursor-pointer focus:outline-none"
            >
              Cancelar
            </button>
          </DialogClose>
          <DialogClose asChild onClick={handleSubmit}>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-primary-normal hover:bg-primary-hover text-white font-semibold text-sm flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none"
            >
              <FiCheck className="size-4" />
              Salvar movimentação
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
