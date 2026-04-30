'use client';

import React, { useCallback, useState } from 'react';
import { FiImage } from "react-icons/fi";

type DropImageProps = {
  onFile?: (file: File) => void;
  label?: string;
};

export function DropImage({ onFile, label = 'Arraste ou clique para adicionar imagem' }: DropImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFile?.(file);
    },
    [onFile],
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <label
      className={`group relative block w-full cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition ${
        dragActive ? 'border-secondary-dark bg-secondary-light/10' : 'border-secondary-light/50 bg-background-normal'
      }`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => {
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
          className="mx-auto h-48 w-full max-w-xs rounded-xl object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className='p-1.5 rounded-lg bg-primary-normal'>
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