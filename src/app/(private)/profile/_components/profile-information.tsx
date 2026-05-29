'use client';

import { InputWithLabel } from '@/components/ui/input';
import { ErrorsInput } from '@/models/global/global';
import Image from 'next/image';
import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';

type ProfileInformationProps = {
  name: string;
  email: string;
  image: string | null;
}

export function ProfileSettings({ name, email, image }: ProfileInformationProps) {
  const [updateName, setUpdateName] = useState(name);
  const [errors, setErrors] = useState<ErrorsInput[]>([]);

  function handleChange(field: string, value: string) {
    if (field === 'name') {
      setUpdateName(value);
    }
  }

  function handleOnBlur(field: string, value: string) {}

  return (
    <section>
      {/* Title section */}
      <div className='mb-6'>
        <h5 className='text-secondary-dark text-lg font-medium'>Informações do perfil</h5>
        <p className="text-secondary-light text-sm">
          Atualize seus dados pessoais e sua foto de perfil.
        </p>
      </div>

      <div className="flex gap-6 ">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-secondary-light/20 shadow-sm group">
            <Image
              src={image || '/avatar-placeholder3.png'}
              alt="Avatar"
              width={100}
              height={100}
              className="object-cover "
            />

            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center rounded-lg 
             bg-secondary-dark/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <FiCamera size={16} className="text-white" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          <button className="cursor-pointer ">
            <span
              className="text-sm text-secondary-light hover:underline 
                hover:text-secondary-normal transition-colors"
            >
              Alterar foto
            </span>
          </button>
        </div>

        {/* Campos do perfil */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <InputWithLabel
                label="Nome"
                placeholder="Ex: Wagner..."
                errors={errors}
                field="name"
                handleChange={handleChange}
                value={updateName}
                handleOnBlur={handleOnBlur}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="email"
                className="text-secondary-normal text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                disabled
                value={email}
                className={`w-full px-2 py-1.5 rounded-lg bg-background-normal border 
           text-secondary-normal focus:outline-secondary-light/20 border-secondary-light/10 disabled:bg-secondary-light/10 disabled:border-secondary-light/10 disabled:text-secondary-light disabled:cursor-not-allowed`}
              />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button
              className={`px-4 py-2 rounded-lg bg-primary-normal text-white 
                  hover:bg-primary-hover transition-colors font-semibold text-sm cursor-pointer`}
            >
              Salvar alterações
            </button>

            <span className='text-sm text-secondary-light block'>As alterações são salvas na sua conta.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
