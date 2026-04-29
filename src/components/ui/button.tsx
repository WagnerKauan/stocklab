'use client';

import { ButtonHTMLAttributes } from 'react';

type variantButton = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  variant: variantButton;
  alingment?: 'left' | 'center';
  collapse?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  text,
  icon,
  variant,
  alingment = 'left',
  collapse = false,
  ...props
}: ButtonProps) {
  const variantsButton: Record<variantButton, string> = {
    primary:
      'bg-primary-normal text-white hover:bg-[#2563EB] transition-colors duration-200',

    secondary:
      'bg-secondary-dark text-white hover:bg-[#0F172A] transition-colors duration-200',

    tertiary:
      'bg-background-normal text-secondary-dark border border-secondary-light/20 hover:bg-[#E5E7EB] hover:border-secondary-light/40 transition-colors duration-200',
  };

  return (
    <button
      {...props}
      className={`max-h-10 py-2 px-4 w-full rounded-lg cursor-pointer  ${variantsButton[variant]} ${props.className}`}
    >
      <div
        className={`flex ${alingment === 'left' ? 'justify-start' : 'justify-center'} items-center ${!collapse && 'gap-2'}`}
      >

        {icon}

        <span
          className={`transition-all ease-in-out duration-200  ${!collapse ? 'opacity-100' : 'opacity-0 w-0'}`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
