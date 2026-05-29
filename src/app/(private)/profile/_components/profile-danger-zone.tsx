"use client";

import { FiLogOut, FiTrash } from 'react-icons/fi';

export function ProfileDangerZone() {

  function handleDeleteAccount() {
    alert('Função de exclusão de conta acionada. Implementar lógica de exclusão aqui.');
  }

  function hadleLogoutAllSessions() {
    alert('Função de logout de todas as sessões acionada. Implementar lógica de logout aqui.');
  }

  return (
    <section className=" mt-8 ">
      {/* Title section */}
      <div className="mb-6">
        <h5 className="text-secondary-dark text-lg font-medium">
          Zona de Perigo
        </h5>
        <p className="text-secondary-light text-sm">
          Ações irreversíveis que afetam sua conta permanentemente.
        </p>
      </div>

      <div className="bg-error/6 border border-error/20 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary-light/10 rounded-lg p-2">
              <FiLogOut className="text-secondary-light" />
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-dark text-sm">
                Saia da sessão em todos os dispositivos.
              </span>
              <span className="text-secondary-light text-[13px]">
                Encerrar todas as sessões ativas em todos os dispositivos.
              </span>
            </div>
          </div>

          <button 
            onClick={hadleLogoutAllSessions}
            className="px-4 py-2 rounded-md font-semibold border border-secondary-light/20 
              cursor-pointer text-sm text-secondary-light hover:bg-secondary-light/10 transition-colors">
            Sair
          </button>
        </div>

        <hr className="text-error/20 w-full my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-error/10 rounded-lg p-2">
              <FiTrash className="text-error" />
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-dark text-sm">
                Excluir conta permanentemente.
              </span>
              <span className="text-secondary-light text-[13px]">
                Isso irá remover permanentemente sua conta e todos os dados associados.
              </span>
            </div>
          </div>

          <button
            onClick={handleDeleteAccount} 
            className="px-4 py-2 rounded-md font-semibold border border-error/20 cursor-pointer text-sm text-error hover:bg-error/10 transition-colors">
            Excluir conta
          </button>
        </div>
      </div>
    </section>
  );
}
