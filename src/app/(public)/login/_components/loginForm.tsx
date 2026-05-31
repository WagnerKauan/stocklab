'use client';

import { actionAuthUser } from '@/actions/user/action-auth-user';
import { InputWithLabel } from '@/components/ui/input';
import { userSchema } from '@/schemas/user/user.schema';
import { sanitizeLogin } from '@/utils/sanitizeUser';
import { validateLogin } from '@/validation/user';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type ErrorsInput = {
  message: string;
  field: string;
  id?: string;
};

export function LoginForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorsInput[]>([]);
  const [loading, setLoading] = useState(false);
 
  function handleChange(field: string, value: string) {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const errors = validateLogin(user);

    if (errors.length > 0) {
      setErrors(prev => [...prev, ...errors]);
      setLoading(false);
      return;
    }

    if (errors.length > 0) {
      setLoading(false);
      return;
    }

    const sanitizedUser = sanitizeLogin(user, 'DB');

    const data = new FormData();

    data.append('email', sanitizedUser.email);
    data.append('password', sanitizedUser.password);

    const result = await actionAuthUser(data);

    if (result.code === 500) {
      toast.error('Ocorreu um erro ao fazer login, tente novamente mais tarde.');
      setLoading(false);
      return;
    }

    if (result.errors.length > 0) {
      result.errors.forEach(err => {
        if (err.field === 'secret') {
          toast.error(err.message);
        } else {
          setErrors(prev => [...prev, err]);
        }
      });

      setLoading(false);
      return;
    }

    resetState();
    setLoading(false);
    toast.success('Bem-vindo de volta!');
    return redirect('/dashboard');
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

   function handleGoogleLogin() {
    try {
      const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      window.location.href = `${url}/api/auth/google`;
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
      toast.error(
        'Ocorreu um erro ao fazer login com o Google, tente novamente mais tarde.',
      );
    }
  }

  

  function resetState() {
    setUser({
      email: '',
      password: '',
    });
    setErrors([]);
  }

  return (
    <div className="mt-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <h4 className="text-2xl">Bem-vindo de volta</h4>
          <p className="text-[12px] text-secondary-light w-full max-w-62.5 text-center">
            Acesse sua conta e gerencie seu estoque com mais controle e
            eficiência.
          </p>
        </div>

        <div className="space-y-4">
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
            disabled={loading || errors.length > 0}
            className="text-white bg-primary-normal p-2 w-full rounded-lg mt-1 
            hover:bg-primary-hover transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
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
        Não possui uma conta?{' '}
        <Link
          href="/register"
          className="text-secondary-dark cursor-pointer hover:underline font-semibold"
        >
          Cadastre-se
        </Link>
      </span>
    </div>
  );
}
