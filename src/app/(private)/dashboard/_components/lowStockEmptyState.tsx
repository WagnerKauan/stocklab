import { TbCircleCheck, TbTrendingUp, TbPackages } from 'react-icons/tb';

export function LowStockEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3.5">
      <div className="w-26 h-26 rounded-full bg-green-50 flex items-center justify-center">
        <TbCircleCheck className="w-14 h-14 text-green-700" />
      </div>

      <div className="text-center flex flex-col gap-1">
        <h4 className="text-2xl font-medium text-secondary-dark">
          Tudo em ordem
        </h4>
        <p className="text-[14px] text-secondary-dark leading-relaxed max-w-90">
          Nenhum produto com estoque baixo nesta categoria. Continue monitorando
          para manter o controle.
        </p>
      </div>

      <div className="flex items-center gap-1.5 mt-1 px-3.5 py-1.5 rounded-lg bg-green-50 w-full max-w-90 justify-center">
        <TbTrendingUp
          className="w-3.5 h-3.5 text-green-700"
          strokeWidth={1.5}
        />
        <span className="text-[12px] font-medium text-green-800">
          Todos os níveis de estoque estão normais
        </span>
      </div>

      <button className="mt-1.5 flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-lg border cursor-pointer
        border-secondary-light/30 text-primary hover:bg-background-normal transition-colors">
        <TbPackages className="w-4 h-4" strokeWidth={1.5} />
        Ver todos os produtos
      </button>
    </div>
  );
}
