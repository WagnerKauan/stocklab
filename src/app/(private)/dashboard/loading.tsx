import { CardMain } from '@/components/layout/cardMain';
export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-4 xl:gap-6 flex-1">
      {/* 3 Cards de Métricas */}
      <div className="xl:grid xl:grid-cols-3 flex flex-wrap gap-4 xl:gap-6">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="border rounded-2xl border-secondary-light/20 bg-white p-4 xl:p-6 flex flex-col xl:gap-11 gap-4 flex-1"
          >
            <div className="flex justify-between items-center gap-3">
              <div className="h-6 xl:h-8 w-24 xl:w-32 rounded bg-skeleton" />
              <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-skeleton shrink-0" />
            </div>
            <div>
              <div className="h-8 xl:h-[42px] w-16 xl:w-24 rounded bg-skeleton" />
            </div>
          </div>
        ))}
      </div>
      {/* Card Principal */}
      <CardMain>
        <div className="flex flex-col gap-8 h-full">
          {/* TitleSection Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 xl:w-11 xl:h-11 rounded-lg bg-skeleton shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-6 xl:h-8 w-48 xl:w-64 rounded bg-skeleton" />
              <div className="h-4 w-64 xl:w-[450px] rounded bg-skeleton" />
            </div>
          </div>
          {/* Filtros Skeleton */}
          <div className="flex flex-col lg:flex-row items-end lg:items-center gap-4 justify-between border-y py-4 border-secondary-light/20">
            {/* MoveTypesProduct tags */}
            <div className="flex-1 overflow-x-auto scrollbar-none max-w-5xl w-full">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-24 xl:w-28 h-9 rounded-lg bg-skeleton shrink-0" />
                ))}
              </div>
            </div>
            {/* Select Categoria */}
            <div className="w-32 h-10 rounded-lg bg-skeleton hidden lg:block shrink-0" />
          </div>
          {/* ListProductLowStock (3 cards) */}
          <div className="flex flex-col flex-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full border border-secondary-light/20 rounded-3xl p-4 shadow-card bg-white"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Thumbnail do Produto */}
                  <div className="h-20 w-23 xl:h-25 xl:w-23 rounded-xl bg-skeleton shrink-0 border border-secondary-light/20" />
                  {/* Detalhes do Produto */}
                  <div className="flex flex-col justify-between w-full gap-1.5 xl:gap-2 min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="h-5 xl:h-6 w-32 xl:w-48 rounded bg-skeleton" />
                      <div className="w-16 xl:w-20 h-6 xl:h-7 rounded-lg bg-skeleton shrink-0" />
                    </div>
                    <div className="h-4 w-40 rounded bg-skeleton" />
                    {/* Variantes */}
                    <div className="flex gap-2 overflow-x-auto xl:flex-wrap xl:overflow-visible scrollbar-none min-w-0">
                      {[1, 2, 3].map((v) => (
                        <div key={v} className="w-20 xl:w-24 h-7 rounded-lg bg-skeleton shrink-0" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Paginação */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-0 items-center justify-center mt-6 w-full relative">
            <div className="h-4 w-28 rounded bg-skeleton sm:absolute sm:left-0 self-start" />
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 rounded-lg bg-skeleton" />
              <div className="h-9 w-9 rounded-lg bg-skeleton" />
              <div className="h-9 w-9 rounded-lg bg-skeleton" />
              <div className="h-9 w-20 rounded-lg bg-skeleton" />
            </div>
          </div>
        </div>
      </CardMain>
    </div>
  );
}