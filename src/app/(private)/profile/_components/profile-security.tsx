'use client';

import { InputWithLabel } from '@/components/ui/input';
import { ErrorsInput } from '@/models/global/global';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { LuChrome, LuShieldCheck } from 'react-icons/lu';

export function ProfileSecurity() {
  const [managePassword, setManagePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorsInput[]>([]);

  function handleChange(field: string, value: string) {
    setManagePassword(prev => ({ ...prev, [field]: value }));
  }

  function handleOnBlur(field: string, value: string) {}

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="mt-8">
      <hr className="text-secondary-light/20 pt-8 w-full" />
      <div className="mb-6">
        <h5 className="text-secondary-dark text-lg font-medium">Segurança</h5>
        <p className="text-secondary-light text-sm">
          Gerencie sua senha e as contas conectadas.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Alterar senha */}
        <div className="space-y-4">
          <span className="text-sm text-secondary-dark flex items-center gap-1">
            <LuShieldCheck size={14} className="text-secondary-light" />
            alterar a senha
          </span>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <InputWithLabel
                type="password"
                label="Senha atual"
                placeholder="••••••••"
                field={'currentPassword'}
                value={managePassword.currentPassword}
                handleChange={handleChange}
                handleOnBlur={handleOnBlur}
                errors={errors}
              />
            </div>

            <div className="relative">
              <InputWithLabel
                type="password"
                label="Nova senha"
                placeholder="Min. 8 caracteres"
                field={'newPassword'}
                value={managePassword.newPassword}
                handleChange={handleChange}
                handleOnBlur={handleOnBlur}
                errors={errors}
              />
            </div>

            <div className="relative">
              <InputWithLabel
                type="password"
                label="Confirmar nova senha"
                placeholder="Re-digite a nova senha"
                field={'confirmPassword'}
                value={managePassword.confirmPassword}
                handleChange={handleChange}
                handleOnBlur={handleOnBlur}
                errors={errors}
              />
            </div>

            <button
              className={`px-4 py-2 rounded-lg bg-secondary-dark text-white 
                  hover:bg-secondary-dark/90 transition-colors font-semibold cursor-pointer text-sm`}
            >
              Atualizar senha
            </button>
          </form>
        </div>

        {/* Conexões */}
        <div>
          <span className="text-sm text-secondary-dark flex items-center gap-1">
            <LuChrome size={14} className="text-secondary-light" />
            Conectar contas
          </span>

          <div className="w-full p-4 bg-background-normal/50 border border-secondary-light/20 rounded-lg space-y-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white shadow-md rounded-lg p-2">
                  <img
                    src="/google.png"
                    alt="Imagem google"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-secondary-dark text-sm">Google</span>
                  <span className="text-secondary-light text-sm">
                    kauanw@gmail.com
                  </span>
                </div>
              </div>

              <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1 text-xs border border-green-600 ml-auto">
                <FiCheck size={14} className="text-green-600" />
                Conectado
              </span>
            </div>

            <button
              className="text-sm font-semibold transition-colors border py-2 px-4 rounded-lg w-full 
              text-secondary-light border-secondary-light/20 hover:bg-secondary-light/10 cursor-pointer"
            >
              Desconectar conta
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-300 flex gap-2">
            <LuShieldCheck size={20} className="text-blue-600" />
            <p className='text-sm text-blue-600'>
              Use uma senha forte e habilite a autenticação de dois fatores para
              manter sua conta segura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
