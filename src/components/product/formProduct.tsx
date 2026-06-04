'use client';

import { ProductModel } from '@/models/product/product-model';
import { DropImage } from './dropImage';
import { VariationsTable } from './tableVariants';
import { useState } from 'react';
import { productSchema } from '@/schemas/product/product.schema';
import { InputWithLabel } from '../ui/inputWithLabel';
import { SelectWithLabel } from '../ui/selectWithLabel';
import { variantSchema } from '@/schemas/product/variant.schema';
import { actionCreateProduct } from '@/actions/product/action-create-product';
import { v4 as uuidv4 } from 'uuid';
import { validateProduct } from '@/validation/product';
import { actionUpdateProduct } from '@/actions/product/action-update-product';
import { useUploadThing } from '@/lib/uploadthing';
import { actionDeleteImage } from '@/actions/product/action-delete-image';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
      { id: uuidv4(), size: '', color: '', stock: 0, priceInCents: 0, sku: '' },
    ],
  );

  const [product, setProduct] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'roupas',
    typeProduct: initialData?.typeProduct || '',
    productImage: initialData?.productImage || '',
    imageKey: initialData?.imageKey || '',
  });

  const router = useRouter();

  const [errors, setErrors] = useState<ErrorInput[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, isUploading } = useUploadThing('productImage');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const existingVariants = initialData?.variants || [];

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

  function resetState() {
    setProduct({
      name: '',
      category: 'roupas',
      typeProduct: '',
      productImage: '',
      imageKey: '',
    });
    setVariants([
      { id: uuidv4(), size: '', color: '', stock: 0, priceInCents: 0, sku: '' },
    ]);
    setErrors([]);
  }

  async function handleSubmit() {
    toast.dismiss();
    setIsLoading(true);
    const data = {
      ...product,
      variants,
    };

    const { errorsProduct, errorsVariants } = validateProduct(data);

    if (errorsProduct.length > 0 || errorsVariants.length > 0) {
      setErrors([...errorsProduct, ...errorsVariants]);
      setIsLoading(false);
      return;
    }

    if (errors.length > 0) {
      setIsLoading(false);
      return;
    }

    if (initialData) {
      await handleEditProduct();
      return;
    }

    if (imageFile) {
      try {
        const result = await startUpload([imageFile]);

        if (result && result[0].ufsUrl) {
          data.productImage = result[0].ufsUrl;
          data.imageKey = result[0].key;
        }
      } catch (error) {
        console.error(error);
        data.productImage = '/product/placeHolderProduct.png';
        data.imageKey = '';
      }
    } else {
      data.productImage = '/product/placeHolderProduct.png';
      data.imageKey = '';
    }

    const response = await actionCreateProduct(data);

    if (response.code === 500) {
      toast.error('Erro desconhecido ao criar o produto');
      setIsLoading(false);
      return;
    }

    if (response.code === 400) {
      setErrors(prev => [...prev, ...response.errors]);
      setIsLoading(false);
      return;
    }

    if (!response.data) {
      toast.error('Erro ao criar o produto');
      setIsLoading(false);
      return;
    }

    toast.success('O produto foi criado com sucesso');

    resetState();
    setIsLoading(false);

    router.push(`/products/${response.data.id}`);
  }
  async function handleEditProduct() {
    toast.dismiss();
    if (!initialData) {
      toast.error('Erro ao editar o produto');
      setIsLoading(false);
      return;
    }

    const data = {
      ...product,
      id: initialData.id,
      variants,
    };

    if (imageFile) {
      try {
        const newImageUrl = await startUpload([imageFile]);

        if (newImageUrl && newImageUrl[0].ufsUrl) {
          if (data.imageKey) {
            const deleteImage = await actionDeleteImage(data.imageKey);
            if (deleteImage.error) console.error(deleteImage.error);
          }

          data.productImage = newImageUrl[0].ufsUrl;
          data.imageKey = newImageUrl[0].key;
        }
      } catch (error) {
        console.error(error);
        toast.error('erro ao editar a imagem');
      }
    }

    const response = await actionUpdateProduct(data);

    switch (response.code) {
      case 500:
        toast.error('Erro desconhecido ao editar o produto');
        setIsLoading(false);
        return;
      case 400:
        setErrors(prev => [...prev, ...response.errors]);
        setIsLoading(false);
        return;
      case 404:
        toast.error('Produto não encontrado');
        setIsLoading(false);
        return;
    }

    if (!response.data) {
      toast.error('Erro ao criar o produto');
      setIsLoading(false);
      return;
    }

    toast.success('O produto foi editado com sucesso');
    resetState();
    setIsLoading(false);

    router.push(`/products/${response.data.id}`);
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

      <DropImage
        imgPreview={product.productImage}
        setFile={setImageFile}
        errors={errors}
        setErrors={setErrors}
      />

      <VariationsTable
        existingVariants={existingVariants}
        errors={errors}
        setErrors={setErrors}
        variants={variants}
        setVariants={setVariants}
        handleOnBlur={handleOnBlur}
      />

      <button
        disabled={errors.length > 0 || isLoading}
        onClick={handleSubmit}
        className={`cursor-pointer px-6 py-3 bg-primary-normal text-white rounded-lg 
          flex items-center justify-center hover:bg-primary-hover transition-colors disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-white text-2xl" />
        ) : initialData ? (
          'Salvar alterações'
        ) : (
          'Criar produto'
        )}
      </button>
    </div>
  );
}
