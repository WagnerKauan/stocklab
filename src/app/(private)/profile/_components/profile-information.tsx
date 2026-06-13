'use client';

import { InputWithLabel } from '@/components/ui/inputWithLabel';
import { ErrorsInput } from '@/models/global/global';
import Image from 'next/image';
import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useUploadThing } from '@/lib/uploadthing';
import { actionUpdateAvatar } from '@/actions/profile/action-update-Avatar';
import { RiLoader2Fill } from 'react-icons/ri';
import { userSchema } from '@/schemas/user/user.schema';
import { actionUpdateName } from '@/actions/profile/action-update-name';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ProfileInformationProps = {
  name: string;
  email: string;
  image: string | null;
};

export function ProfileSettings({
  name,
  email,
  image,
}: ProfileInformationProps) {
  const [updateName, setUpdateName] = useState(name);
  const [errors, setErrors] = useState<ErrorsInput[]>([]);
  const [loadingUpdateAvatar, setLoadingUpdateAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing('userAvatar');

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_SIZE = 4 * 1024 * 1024;

  function handleChange(field: string, value: string) {
    if (field === 'name') {
      setUpdateName(value);
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    setLoadingUpdateAvatar(true);

    if (file.type && !validTypes.includes(file.type)) {
      toast.error('Formato de arquivo inválido, tente novamente');
      setLoadingUpdateAvatar(false);
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };
    const compressedFile = await imageCompression(file, options);

    if (compressedFile.size > MAX_SIZE) {
      toast.error('Arquivo muito grande, tente novamente');
      setLoadingUpdateAvatar(false);
      return;
    }

    try {
      const response = await startUpload([compressedFile]);

      if (response && response[0].ufsUrl) {
        const imageUrl = response[0].ufsUrl;
        const imageKey = response[0].key;
        const result = await actionUpdateAvatar({
          newImageUrl: imageUrl,
          newImageKey: imageKey,
        });
        if (result.message) {
          toast.success(result.message);
          setLoadingUpdateAvatar(false);
        } else {
          toast.error(result.error);
          setLoadingUpdateAvatar(false);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar a imagem');
      setLoadingUpdateAvatar(false);
      return;
    }
  }

  async function handleUpdateName() {
    setLoading(true);

    const errors = userSchema.shape.name.safeParse(updateName);

    if (!errors.success) {
      errors.error.issues.forEach(issue => {
        setErrors(prev => [
          ...prev,
          {
            message: issue.message,
            field: 'name',
          },
        ]);
      });
      setLoading(false);
      return;
    }

    const result = await actionUpdateName({ name: updateName });

    if (result.errors) {
      result.errors.forEach(error => {
        if (error.field === 'secret') {
          toast.error(error.message);
        } else {
          setErrors(prev => [
            ...prev,
            { message: error.message, field: error.field },
          ]);
        }
      });

      setLoading(false);
      return;
    }

    if (result.status && result.message) {
      toast.success(result.message);
      setLoading(false);
      return;
    }
  }

  return (
    <section>
      {/* Title section */}
      <div className="mb-6">
        <h5 className="text-secondary-dark text-lg font-medium">
          Informações do perfil
        </h5>
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
              className="object-cover w-full h-full"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute inset-0 flex items-center justify-center rounded-lg ${loadingUpdateAvatar && 'opacity-100'}
             bg-secondary-dark/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
            >
              {loadingUpdateAvatar ? (
                <RiLoader2Fill size={24} className="animate-spin text-white" />
              ) : (
                <FiCamera size={16} color="#FFF" />
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loadingUpdateAvatar}
            />
          </div>

          <input
            id="avatar-upload-button"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loadingUpdateAvatar}
          />
          <label
            htmlFor="avatar-upload-button"
            className="text-sm text-secondary-normal cursor-pointer 
            hover:text-secondary-light hover:underline"
          >
            Alterar foto
          </label>
        </div>

        {/* Campos do perfil */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <InputWithLabel
                label="Nome"
                placeholder="Ex: Wagner..."
                errors={errors}
                field="name"
                handleChange={handleChange}
                value={updateName}
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

          <div className="flex items-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg bg-primary-normal text-white 
                  hover:bg-primary-hover transition-colors font-semibold text-sm cursor-pointer w-full flex items-center justify-center max-w-40`}
              onClick={handleUpdateName}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  size={17}
                  className="animate-spin text-white"
                />
              ) : (
                'Salvar alterações'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
