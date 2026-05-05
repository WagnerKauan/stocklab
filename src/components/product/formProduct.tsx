'use client';

import { ProductModel } from '@/models/product/product-model';
import { DropImage } from './dropImage';
import { VariationsTable } from './tableVariants';
import { useState } from 'react';

type FormProductProps = {
  initialData?: ProductModel;
};

export function FormProduct({ initialData }: FormProductProps) {

  const [variants, setVariants] = useState(initialData?.variants || [
    { size: '', color: '', stock: '', price: '' },
  ]);

  const [product, setProduct] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    typeProduct: initialData?.typeProduct || '',
    image: initialData?.productImage || '',
  });

  const handleChange = (field: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-187.5 w-full mx-auto flex flex-col h-full  gap-6">
      <div className="flex flex-col items-center border-b border-secondary-light/20 pb-2">
        <h1 className="text-[28px] text-secondary-dark">
          {initialData ? 'Edite o produto' : 'Crie um novo produto'}
        </h1>
        <p className="text-secondary-light">
          {initialData
            ? 'Preencha todas informações necessárias para editar um produto'
            : 'Preencha todas informações necessárias para criar um novo produto'}
        </p>
      </div>

      <div className="flex-1">
        <label htmlFor="name" className="text-secondary-normal">
          Nome
        </label>
        <input
          type="text"
          id="name"
          placeholder="Ex: Calça Jeans"
          className="w-full p-2 rounded-lg bg-background-normal border border-secondary-light/10 text-secondary-normal focus:outline-secondary-light/20"
          onChange={e => handleChange('name', e.target.value)}
          value={product.name}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label htmlFor="category" className="text-secondary-normal">
            Categoria
          </label>
          <select
            name="category"
            id="category"
            className="w-full p-2 rounded-lg bg-background-normal border border-secondary-light/10 text-secondary-normal focus:outline-secondary-light/20"
            onChange={e => handleChange('category', e.target.value)}
            value={product.category}
          >
            <option value="roupas">Roupas</option>
            <option value="calçados">Calçados</option>
            <option value="acessorios">Acessórios</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="typeProduct" className="text-secondary-normal">
            Tipo
          </label>
          <input
            name="typeProduct"
            id="typeProduct"
            className="w-full p-2 rounded-lg bg-background-normal border 
            border-secondary-light/10 text-secondary-normal focus:outline-secondary-light/20"
            placeholder="ex: camisa,blusa,calça"
            onChange={e => handleChange('typeProduct', e.target.value)}
            value={product.typeProduct}
          />
        </div>
      </div>

      <DropImage imgPreview={initialData ? initialData.productImage : null} />

      <VariationsTable variants={variants} setVariants={setVariants} />

      <button className="cursor-pointer px-6 py-3 bg-[#4A7CF7] text-white rounded-lg hover:bg-[#3A66C7] transition-colors">
        {initialData ? 'Salvar alterações' : 'Criar produto'}
      </button>
    </div>
  );
}
