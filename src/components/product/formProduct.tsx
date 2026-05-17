'use client';

import { ProductModel } from '@/models/product/product-model';
import { DropImage } from './dropImage';
import { VariationsTable } from './tableVariants';
import { useState } from 'react';
import { productSchema } from '@/schemas/product/product.schema';
import { InputWithLabel } from '../ui/input';
import { SelectWithLabel } from '../ui/select';
import { variantSchema } from '@/schemas/product/variant.schema';
import { createProduct } from '@/actions/product/create-product';
import { v4 as uuidv4 } from 'uuid';

/*
  PRECISO TRABALHAR NA FUNÇÃO handleSubmit VERIFICAR TODOS OS CAMPOS COM ZOD E PEGAR TODOS OS ERROS COLOCAR DENTRO DE UM ARRAY E PASSAR PARA O ESTADO
*/

type FormProductProps = {
  initialData?: ProductModel;
};

export type ErrorInput = {
  id?: string;
  message: string;
  field: string;
};

export function FormProduct({ initialData }: FormProductProps) {
  const [variants, setVariants] = useState(
    initialData?.variants || [
      { id: uuidv4(), size: '', color: '', stock: 0, priceInCents: 0 },
    ],
  );

  const [product, setProduct] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    typeProduct: initialData?.typeProduct || '',
    productImage: initialData?.productImage || '',
  });

  const [errors, setErrors] = useState<ErrorInput[]>([]);

  const handleChange = (field: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleOnBlur(
    field: string,
    value: string | number,
    id?: string,
  ): boolean {
    console.log(value);
    if (
      (!isNaN(Number(value)) && field === 'priceInCents') ||
      field === 'stock'
    ) {
      value = Number(value);
    }

    const fieldSchema =
      productSchema.shape[field as keyof typeof productSchema.shape] ||
      variantSchema.shape[field as keyof typeof variantSchema.shape];

    const isValidField = fieldSchema.safeParse(value);

    if (!isValidField?.success) {
      setErrors(prev => [
        ...prev,
        {
          id,
          message: isValidField.error.issues[0].message,
          field: field,
        },
      ]);
      return true;
    }

    setErrors(prev =>
      prev.filter(err => err.field !== field || err?.id !== id),
    );

    return false;
  }

  async function handleSubmit() {
    const data = {
      ...product,
      variants,
    };

    const errorsProduct = productSchema
      .safeParse(product)
      .error?.issues.reduce<ErrorInput[]>((errs, issue) => {
        errs.push({
          message: issue.message,
          field: issue.path[0].toString(),
        });
        return errs;
      }, []) || [];

    const errorsVariants = variants.reduce<ErrorInput[]>((errs, variant) => {
      const variantValid = variantSchema.safeParse(variant);
      if (!variantValid.success) {

        variantValid.error.issues.forEach(issue => {
          errs.push({
            id: variant.id,
            message: issue.message,
            field: issue.path[0].toString(),
          });
        });
      }

      return errs;
    }, []);

    if(errorsProduct && errorsProduct.length > 0 || errorsVariants.length > 0) {
      setErrors([...errorsProduct, ...errorsVariants]);
      return
    }

    const response = await createProduct(data);
  }

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

      <div className="flex-1 relative">
        <InputWithLabel
          field="name"
          label="Nome"
          placeholder="Ex: Calça Jeans"
          handleChange={handleChange}
          value={product.name}
          handleOnBlur={handleOnBlur}
          errors={errors}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <SelectWithLabel
            field="category"
            label="Categoria"
            handleChange={handleChange}
            value={product.category}
            errors={errors}
            options={[
              { value: 'roupas', label: 'Roupas' },
              { value: 'calcados', label: 'Calçados' },
              { value: 'acessorios', label: 'Acessórios' },
            ]}
            handleOnBlur={handleOnBlur}
          />
        </div>

        <div className="flex-1 relative">
          <InputWithLabel
            field="typeProduct"
            label="Tipo"
            placeholder="ex: camisa,blusa,calça"
            handleChange={handleChange}
            value={product.typeProduct}
            handleOnBlur={handleOnBlur}
            errors={errors}
          />
        </div>
      </div>

      <DropImage imgPreview={initialData ? initialData.productImage : null} />

      <VariationsTable
        errors={errors}
        setErrors={setErrors}
        variants={variants}
        setVariants={setVariants}
        handleOnBlur={handleOnBlur}
      />

      <button
        disabled={errors.length > 0}
        onClick={handleSubmit}
        className={`cursor-pointer px-6 py-3 bg-primary-normal text-white rounded-lg hover:bg-primary-hover transition-colors disabled:cursor-not-allowed`}
      >
        {initialData ? 'Salvar alterações' : 'Criar produto'}
      </button>
    </div>
  );
}
