'use client';

import { actionUpdatePassword } from '@/actions/profile/action-update-Password';
import { InputWithLabel } from '@/components/ui/input';
import { ErrorsInput } from '@/models/global/global';
import { updatePasswordSchema } from '@/schemas/user/update-password-schema';
import { useState } from 'react';
import { LuChrome, LuShieldCheck } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';

type MenagePassword = {
  currentPassword: string | null;
  newPassword: string;
  confirmPassword: string;
};

export function ProfileSecurity({ hasPassword }: { hasPassword: boolean }) {
  const [loading, setLoading] = useState(false);
  const [managePassword, setManagePassword] = useState<MenagePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorsInput[]>([]);

  function handleChange(field: string, value: string) {
    setManagePassword(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const errors = updatePasswordSchema.safeParse(managePassword);

    if (!errors.success) {
      errors.error.issues.forEach(issue => {
        setErrors(prev => [
          ...prev,
          { message: issue.message, field: issue.path[0].toString() },
        ]);
      });
      setLoading(false);
      return;
    }

    const result = await actionUpdatePassword({ ...managePassword });

    if (result.errors && result.errors.length > 0) {
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

    if (result.message) {
      toast.success(result.message);
      setLoading(false);
      resetState();
      return;
    }
  }


  function resetState() {
    setManagePassword({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors([]);
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
            {hasPassword ? 'Alterar senha' : 'Criar senha'}
          </span>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {hasPassword && (
              <div className="relative">
                <InputWithLabel
                  type="password"
                  label="Senha atual"
                  placeholder="••••••••"
                  field={'currentPassword'}
                  value={managePassword.currentPassword || ''}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            )}

            <div className="relative">
              <InputWithLabel
                type="password"
                label={hasPassword ? 'Nova senha' : 'Senha'}
                placeholder="Min. 8 caracteres"
                field={'newPassword'}
                value={managePassword.newPassword}
                handleChange={handleChange}
                errors={errors}
              />
            </div>

            <div className="relative">
              <InputWithLabel
                type="password"
                label={
                  hasPassword ? 'Confirme a nova senha' : 'Confirme a senha'
                }
                placeholder="Re-digite a nova senha"
                field={'confirmPassword'}
                value={managePassword.confirmPassword}
                handleChange={handleChange}
                errors={errors}
              />
            </div>

            <button
            type='submit'
              className={`px-4 py-2 rounded-lg bg-secondary-dark text-white 
                  hover:bg-secondary-dark/90 transition-colors font-semibold cursor-pointer text-sm flex items-center`}
            >
              {hasPassword ? 'Alterar senha' : 'Criar senha'}
              {loading && (
                <span className="ml-2">
                  <AiOutlineLoading3Quarters size={16} className="animate-spin text-white" />
                </span>
              )}
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
            <p className="text-sm text-blue-600">
              Use uma senha forte e habilite a autenticação de dois fatores para
              manter sua conta segura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
