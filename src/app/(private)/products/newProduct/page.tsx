import { CardMain } from '@/components/layout/cardMain';
import { DropImage } from '@/../src/app/(private)/products/newProduct/_components/dropImage';
import { VariationsTable } from '@/../src/app/(private)/products/newProduct/_components/tableVariants';

export default function NewProduct() {
  return (
    <CardMain>
      <div className="max-w-187.5 w-full mx-auto">
        <div className="flex flex-col items-center border-b border-secondary-light/20 pb-2">
          <h1 className="text-[28px] text-secondary-dark">
            Crie um novo produto
          </h1>
          <p className="text-secondary-light">
            Preencha todas informações necessárias para criar um novo produto
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="text-secondary-normal">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ex: Calça Jeans"
              className="w-full p-3 rounded-lg bg-background-normal border border-secondary-light/10 text-secondary-normal focus:outline-secondary-light/20"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="category" className="text-secondary-normal">
              Categoria
            </label>
            <select
              name="category"
              id="category"
              className="w-full p-3 rounded-lg bg-background-normal border border-secondary-light/10 text-secondary-normal focus:outline-secondary-light/20"
            >
              <option value="">Ex: Calça</option>
              <option value="roupas">Roupas</option>
              <option value="calçados">Calçados</option>
              <option value="acessorios">Acessórios</option>
            </select>
          </div>
        </div>

        <DropImage />

        <VariationsTable />
      </div>
    </CardMain>
  );
}
