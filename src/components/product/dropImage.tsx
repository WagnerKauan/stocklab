'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type DropImageProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  label?: string;
  imgPreview: string | null;
  errors: { message: string; field: string }[];
  setErrors: React.Dispatch<
    React.SetStateAction<{ message: string; field: string }[]>
  >;
};

export function DropImage({
  imgPreview,
  label = 'Arraste ou clique para adicionar imagem',
  setFile,
  errors,
  setErrors,
}: DropImageProps) {
  const [preview, setPreview] = useState<string | null>(imgPreview);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorsForm = errors.find(error => error.field === 'productImage');

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    setPreview(imgPreview);
  }, [imgPreview]);

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_SIZE = 4 * 1024 * 1024;

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (isLoading) return;
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleFile = useCallback(
    async (file: File) => {
      setIsLoading(true);
      if (file) {
        if (!validTypes.includes(file.type)) {
          setErrors(prev => [
            ...prev,
            { message: 'Formato de imagem inválido.', field: 'productImage' },
          ]);
          setIsLoading(false);
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
          setErrors(prev => [
            ...prev,
            { message: 'Imagem muito grande.', field: 'productImage' },
          ]);
          setIsLoading(false);
          return;
        }

        const url = URL.createObjectURL(compressedFile);
        setPreview(url);
        setFile(compressedFile);
        setIsLoading(false);

        setErrors(prev => prev.filter(error => error.field !== 'productImage'));
      }
    },
    [setFile],
  );
  const hasError = errorsForm && errorsForm?.field === 'productImage';

  const borderColor = hasError
    ? 'border-error'
    : dragActive
      ? 'border-secondary-dark'
      : 'border-secondary-light/50';


  return (
    <div className="relative">
      <label
        className={`group relative block w-full rounded-2xl border-2 border-dashed p-2 text-center transition 
          ${borderColor}  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={e => {
          e.preventDefault();

          setDragActive(true);
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={isLoading}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-24 w-full max-w-24 rounded-xl object-cover"
          />
        ) : isLoading ? (
          <div className="mx-auto h-24 w-full max-w-24 animate-pulse rounded-xl bg-secondary-light/20 flex items-center justify-center">
            <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary-normal">
              <FiImage className="text-white" size={32} />
            </div>
            <p
              className={`text-sm ${hasError ? 'text-error' : 'text-secondary-light'}`}
            >
              {hasError ? errorsForm.message : label}
            </p>
          </div>
        )}
      </label>
    </div>
  );
}
