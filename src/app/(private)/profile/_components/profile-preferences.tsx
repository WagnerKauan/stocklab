'use client';

import { useCallback, useRef, useState } from 'react';
import {
  LuMonitorCog,
  LuMoon,
  LuSun,
  LuMail,
  LuBell,
  LuPackageX,
} from 'react-icons/lu';
import { FiBarChart2, FiCheck } from 'react-icons/fi';
import { Switch } from '@/components/ui/switch';

type ThemeOption = 'light' | 'dark' | 'system';

export function ProfilePreferences() {
  const [theme, setTheme] = useState<ThemeOption>('light');
  const [thresholdSaved, setThresholdSaved] = useState(false);
  const [stockThreshold, setStockThreshold] = useState(10);

  const themes = [
    { name: 'Light', value: 'light', icon: <LuSun /> },
    { name: 'Dark', value: 'dark', icon: <LuMoon /> },
    { name: 'System', value: 'system', icon: <LuMonitorCog /> },
  ];

  const handleThresholdChange = useCallback((value: number) => {}, []);

  function handleSaveThreshold() {}

  return (
    <section className="mt-8 space-y-6">
      <div>
        <h5 className="text-secondary-dark text-lg font-medium">
          Preferências
        </h5>
        <p className="text-secondary-light text-sm">
          Personalize a aparência e as notificações do StockLab.
        </p>
      </div>

      <div>
        <h6 className="text-secondary-normal text-sm  mb-2">Tema</h6>
        <div className="flex space-x-4">
          {themes.map(option => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded-md font-semibold border border-secondary-light/20 cursor-pointer text-sm flex items-center gap-1.5
                ${theme === option.value ? 'bg-secondary-dark text-white' : 'bg-white text-secondary-dark'} transition-colors`}
              onClick={() => setTheme(option.value as ThemeOption)}
            >
              {option.icon}
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4 px-4 py-3.5 bg-[#f9fafb] border border-[rgba(107,114,128,0.14)] rounded-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(107,114,128,0.14)] shadow-sm flex items-center justify-center shrink-0">
            <LuPackageX size={15} className="text-[#6b7280]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-secondary-dark">
              Alerta de estoque mínimo
            </p>
            <p className="text-xs text-[#9ca3af] mt-0.5 truncate">
              Acione alertas quando uma variante cair abaixo dessa quantidade.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-xs text-[#16a34a] transition-opacity">
            <FiCheck size={11} />
            Alerta salvo
          </span>

          <div className="flex items-center bg-white border border-[rgba(107,114,128,0.2)] rounded-lg overflow-hidden">
            <button
              className="w-7 h-8.5 flex items-center justify-center text-[#9ca3af] 
              hover:text-secondary-dark hover:bg-[#f3f4f6] transition-colors cursor-pointer text-base leading-none"
              onClick={() => setStockThreshold(prev => Math.max(1, prev - 1))}
            >
              −
            </button>
            <input
              type="number"
              className="w-10 h-8.5 text-center text-sm text-secondary-dark bg-transparent outline-none 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={9999}
              value={stockThreshold}
              onChange={e => setStockThreshold(Number(e.target.value))}
            />
            <button
              className="w-7 h-8.5 flex items-center justify-center text-[#9ca3af] hover:text-secondary-dark
                hover:bg-[#f3f4f6] transition-colors cursor-pointer text-base leading-none"
              onClick={() =>
                setStockThreshold(prev => Math.min(9999, prev + 1))
              }
            >
              +
            </button>
          </div>
          <span className="text-xs text-[#9ca3af]">
            {stockThreshold === 1 ? 'unidade' : 'unidades'}
          </span>
          <button
            className="h-8.5 px-3.5 text-xs bg-secondary-dark text-white rounded-lg 
            hover:bg-[#1f2937] transition-colors cursor-pointer shrink-0"
          >
            Salvar
          </button>
        </div>
      </div>

      <div className="bg-white border border-secondary-light/20 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary-light/10 rounded-lg p-2">
              <LuMail className="text-secondary-light" />
            </div>
            <div className="flex flex-col">
              <span className="text-secondary-dark text-sm">
                Notificações por email
              </span>
              <span className="text-secondary-light text-[13px]">
                Receba resumos de pedidos e atividades por e-mail.
              </span>
            </div>
          </div>

          <Switch
            size="default"
            className="cursor-pointer data-[state=checked]:bg-primary-normal data-[state=unchecked]:bg-zinc-200"
          />
        </div>

        <hr className="text-secondary-light/20 w-full my-4" />

        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary-light/10 rounded-lg p-2">
              <LuBell className="text-secondary-light" />
            </div>

            <div className="flex flex-col">
              <span className="text-secondary-dark text-sm">
                Alertas de estoque baixo
              </span>
              <span className="text-secondary-light text-[13px]">
                Receba notificações quando os itens estiverem abaixo do nível
                mínimo.
              </span>
            </div>
          </div>

          <Switch
            size="default"
            className="cursor-pointer data-[state=checked]:bg-primary-normal data-[state=unchecked]:bg-zinc-200"
            defaultChecked
          />
        </div>

        <hr className="text-secondary-light/20 w-full my-4" />

        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary-light/10 rounded-lg p-2">
              <FiBarChart2 className="text-secondary-light  " />
            </div>

            <div className="flex flex-col">
              <span className="text-secondary-dark text-sm">
                Relatório Semanal
              </span>
              <span className="text-secondary-light text-[13px]">
                Um resumo das movimentações de estoque todas as segundas-feiras
              </span>
            </div>
          </div>

          <Switch
            size="default"
            className="cursor-pointer data-[state=checked]:bg-primary-normal data-[state=unchecked]:bg-zinc-200"
          />
        </div>
      </div>
    </section>
  );
}
