'use client';

import { useUploadThing } from '@/lib/uploadthing';
import React, { useCallback, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

type DropImageProps = {
  setUrlImage: (field: string, value: string) => void;
  label?: string;
  imgPreview: string | null;
};

export function DropImage({
  imgPreview,
  label = 'Arraste ou clique para adicionar imagem',
  setUrlImage,
}: DropImageProps) {
  const [preview, setPreview] = useState<string | null>(imgPreview);
  const [dragActive, setDragActive] = useState(false);
  const { startUpload, isUploading } = useUploadThing('productImage');

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const MAX_SIZE = 5 * 1024 * 1024;

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
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
      if (file) {
        if (!validTypes.includes(file.type)) {
          return {
            message: 'Formato inválido',
            field: 'productImage',
          };
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
        };

        const compressedFile = await imageCompression(file, options);

        if (compressedFile.size > MAX_SIZE) {
          return {
            message: 'Imagem muito grande.',
            field: 'productImage',
          };
        }

        const url = URL.createObjectURL(compressedFile);
        setPreview(url);

        const response = await startUpload([compressedFile]);

        if (response) {
          if (response[0].ufsUrl) {
            setUrlImage('productImage', response[0].ufsUrl);
          }
        }
      }
    },
    [startUpload],
  );

  return (
    <label
      className={`group relative block w-full cursor-pointer rounded-2xl border-2 border-dashed p-2 text-center transition ${
        dragActive
          ? 'border-secondary-dark bg-secondary-light/10'
          : 'border-secondary-light/50 bg-background-normal'
      }`}
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
      />

      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto h-24 w-full max-w-24 rounded-xl object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary-normal">
            <FiImage className="text-white" size={32} />
          </div>
          <p className="text-sm text-secondary-light">
            Faça upload da imagem do produto ou arraste aqui
          </p>
        </div>
      )}
    </label>
  );
}

// tect this at compile time: https://github.com/Effect-TS/language-service
// [03:05:44.141] WARN (#26) handleCallbackRequest=443ms: Executing an Effect versioned 3.20.0 with a Runtime of version 3.17.7, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service
// [03:05:44.142] WARN (#26) handleCallbackRequest=444ms: Executing an Effect versioned 3.20.0 with a Runtime of version 3.17.7, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service
// [03:05:44.143] WARN (#26) handleCallbackRequest=445ms: Executing an Effect versioned 3.20.0 with a Runtime of version 3.17.7, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service
// [03:05:44.144] WARN (#26) handleCallbackRequest=446ms: Executing an Effect versioned 3.20.0 with a Runtime of version 3.17.7, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service
// [03:05:44.145] INFO (#26) handleCallbackRequest=447ms: Sent callback result to UploadThing
