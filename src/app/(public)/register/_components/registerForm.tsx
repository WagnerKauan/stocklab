'use client';

import { actionCreateUser } from '@/actions/user/action-create-user';
import { InputWithLabel } from '@/components/ui/input';
import { userSchema } from '@/schemas/user/user.schema';
import { sanitizeUser } from '@/utils/sanitizeUser';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type ErrorsInput = {
  message: string;
  field: string;
  id?: string;
};

export function RegisterForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });
  const [errors, setErrors] = useState<ErrorsInput[]>([]);

  function handleChange(field: string, value: string) {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValidUser = userSchema.safeParse(user);

    if (!isValidUser.success) {
      const errorsUser = isValidUser.error.issues.reduce<ErrorsInput[]>(
        (errs, issue) => {
          errs.push({
            message: issue.message,
            field: issue.path[0] as string,
          });
          return errs;
        },
        [],
      );

      setErrors(prev => [...prev, ...errorsUser]);
      return;
    }

    if (errors.length > 0) return;

    const sanitizedUser = sanitizeUser(user, 'DB');

    const result = await actionCreateUser(sanitizedUser);

    if (result.code === 500)
      return alert(
        'Ocorreu um erro ao criar a sua conta, tente novamente mais tarde.',
      );

    if (result.errors.length > 0) {
      setErrors(prev => [...prev, ...result.errors]);
      return;
    }

    alert(`Conta criada com sucesso! ${user.name}, seja bem-vindo!`);
    if (result.status) return redirect('/dashboard');
  }

  function handleBlur(field: string, value: string) {
    const fieldSchema =
      userSchema.shape[field as keyof typeof userSchema.shape];

    const isValidField = fieldSchema.safeParse(value);

    if (!isValidField?.success) {
      setErrors(prev => [
        ...prev,
        {
          message: isValidField.error.issues[0].message,
          field: field,
        },
      ]);
      return;
    }

    setErrors(prev => prev.filter(err => err.field !== field));
  }

  function handleGoogleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('Login com Google');
    try {
      const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      window.location.href = `${url}/api/auth/google`;
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
      alert(
        'Ocorreu um erro ao fazer login com o Google, tente novamente mais tarde.',
      );
    }
  }

  return (
    <div className="mt-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <h4 className="text-2xl">Crie sua conta</h4>
          <p className="text-[12px] text-secondary-light w-full max-w-62.5 text-center">
            Comece agora e tenha mais controle sobre os produtos da sua loja.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <InputWithLabel
              field="name"
              label="Nome"
              placeholder="Ex: Wagner..."
              errors={errors}
              value={user.name}
              handleChange={handleChange}
              handleOnBlur={handleBlur}
            />
          </div>
          <div className="relative">
            <InputWithLabel
              field="email"
              label="Email"
              placeholder="seu@email.com"
              errors={errors}
              value={user.email}
              handleChange={handleChange}
              handleOnBlur={handleBlur}
            />
          </div>
          <div className="relative w">
            <InputWithLabel
              field="password"
              label="Senha"
              placeholder="*********"
              errors={errors}
              value={user.password}
              type="password"
              handleChange={handleChange}
              handleOnBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-primary-normal p-2 w-full rounded-lg mt-1 
            hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Criar conta
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center my-4">
        <div className="w-full h-px bg-secondary-light/20" />
        <span className="text-secondary-normal mx-2 text-sm">Ou</span>
        <div className="w-full h-px bg-secondary-light/20" />
      </div>

      <button
        className="flex items-center justify-center gap-1.5 bg-secondary-dark text-white p-2 w-full rounded-lg 
        cursor-pointer hover:bg-secondary-normal transition-colors mb-4"
        type="button"
        onClick={handleGoogleLogin}
      >
        <img src="/google.png" alt="Imagem do google" />
        Google
      </button>

      <span className="text-secondary-normal w-full text-center block">
        Ja possui uma conta?{' '}
        <Link
          href="/login"
          className="text-secondary-dark cursor-pointer hover:underline font-semibold"
        >
          Login
        </Link>
      </span>
    </div>
  );
}
