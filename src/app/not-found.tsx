'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiHome, HiArrowLeft } from 'react-icons/hi';
import { MdOutlineSearchOff } from 'react-icons/md';
import { RiLightbulbLine, RiSearchLine } from 'react-icons/ri';

// ---------------------------------------------------------------------------
// Inline animation keyframes — identical token set to error.tsx
// pulseRing is redefined here with blue hue to match the 404 identity
// ---------------------------------------------------------------------------
const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.80); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes pulseRingBlue {
    0%   { box-shadow: 0 0 0 0    rgba(59, 130, 246, 0.28); }
    70%  { box-shadow: 0 0 0 14px rgba(59, 130, 246, 0.00); }
    100% { box-shadow: 0 0 0 0    rgba(59, 130, 246, 0.00); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-6px); }
  }

  .anim-fade-up       { animation: fadeSlideUp    0.55s cubic-bezier(0.16,1,0.3,1) both;         }
  .anim-fade-up-d1    { animation: fadeSlideUp    0.55s cubic-bezier(0.16,1,0.3,1) 0.10s both;   }
  .anim-fade-up-d2    { animation: fadeSlideUp    0.55s cubic-bezier(0.16,1,0.3,1) 0.20s both;   }
  .anim-fade-up-d3    { animation: fadeSlideUp    0.55s cubic-bezier(0.16,1,0.3,1) 0.30s both;   }
  .anim-scale-in      { animation: scaleIn        0.45s cubic-bezier(0.16,1,0.3,1) both;         }
  .anim-pulse-ring    { animation: pulseRingBlue  2.20s ease-out infinite;                        }
  .anim-float         { animation: floatY         3.50s ease-in-out infinite;                     }

  @media (prefers-reduced-motion: reduce) {
    .anim-fade-up, .anim-fade-up-d1, .anim-fade-up-d2, .anim-fade-up-d3,
    .anim-scale-in, .anim-pulse-ring, .anim-float {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function NotFound() {
  const router = useRouter();

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{animationStyles}</style>

      {/*
       * Full-screen backdrop
       * Dot-grid pattern identical to error.tsx — same size, same color.
       */}
      <main
        role="main"
        aria-labelledby="not-found-heading"
        className="
          min-h-screen w-full
          flex items-center justify-center
          px-4 py-12
          bg-[#F3F4F6]
        "
        style={{
          backgroundImage: `radial-gradient(circle, #D1D5DB 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      >
        {/* ----------------------------------------------------------------
         * Card — identical structure, radii, border, and shadow to error.tsx
         * ---------------------------------------------------------------- */}
        <div
          className="
            relative w-full max-w-[480px]
            bg-white rounded-3xl
            border border-gray-100
            overflow-hidden
            anim-fade-up
          "
          style={{ boxShadow: '0px 2px 6px rgba(17, 24, 39, 0.10), 0px 16px 48px rgba(17, 24, 39, 0.08)' }}
        >

          {/* Top accent bar — same gradient as error.tsx */}
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
            }}
          />

          <div className="px-8 py-10 md:px-10">

            {/* ---- Status badge — blue (informational, not critical) ---- */}
            <div className="flex justify-center mb-8 anim-fade-up">
              <span
                className="
                  inline-flex items-center gap-2
                  bg-blue-50 text-[#3B82F6]
                  text-xs font-semibold tracking-wide
                  px-3.5 py-1.5 rounded-full
                  border border-blue-100
                "
              >
                <RiSearchLine aria-hidden="true" className="w-3.5 h-3.5" />
                404 · Não encontrado
              </span>
            </div>

            {/* ---- Icon — blue palette, pulse ring, float (same structure as error.tsx) ---- */}
            <div className="flex justify-center mb-4 anim-scale-in" aria-hidden="true">
              {/* Outer pulse ring — blue variant */}
              <div className="anim-pulse-ring rounded-full">
                {/* Float wrapper */}
                <div className="anim-float">
                  <div
                    className="
                      w-24 h-24 rounded-full
                      flex items-center justify-center
                      bg-gradient-to-br from-blue-50 to-indigo-100
                      border-2 border-blue-200
                    "
                  >
                    <MdOutlineSearchOff
                      className="w-12 h-12 text-[#3B82F6]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---- 404 display code ---- */}
            <div className="flex justify-center mb-1 anim-fade-up" aria-hidden="true">
              <span
                className="text-[3.75rem] font-black tracking-tight leading-none select-none"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </span>
            </div>

            {/* ---- Heading — same typographic scale as error.tsx ---- */}
            <div className="text-center mb-6 anim-fade-up-d1">
              <h1
                id="not-found-heading"
                className="
                  text-[1.65rem] md:text-3xl font-bold
                  text-[#111827] tracking-tight
                  leading-tight mb-3
                "
              >
                Página não encontrada
              </h1>

              <p className="text-[#6B7280] text-[0.9375rem] leading-relaxed">
                A página que você está tentando acessar não existe, foi removida
                ou o endereço está incorreto.
              </p>
            </div>

            {/* ---- Tip notice — amber (friendly hint, not alarming) ---- */}
            <div
              className="
                flex items-start gap-3
                bg-amber-50 border border-amber-100
                rounded-2xl px-4 py-3.5
                mb-7
                anim-fade-up-d2
              "
              role="note"
              aria-label="Dica para o usuário"
            >
              <RiLightbulbLine
                className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-[#374151] leading-snug">
                <span className="font-semibold text-[#D97706]">Dica:</span>{' '}
                Verifique se o endereço foi digitado corretamente ou se o link
                que você seguiu ainda está ativo.
              </p>
            </div>

            {/* ---- CTA buttons — same sizing, radius, and focus tokens as error.tsx ---- */}
            <div
              className="flex flex-col sm:flex-row gap-3 anim-fade-up-d3"
              role="group"
              aria-label="Ações disponíveis"
            >
              {/* Primary — Dashboard (Link, same style as error.tsx primary button) */}
              <Link
                href="/dashboard"
                aria-label="Voltar para o Dashboard principal"
                className="
                  flex-1 inline-flex items-center justify-center gap-2
                  bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8]
                  text-white text-sm font-semibold
                  py-3.5 px-5 rounded-xl
                  transition-all duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2
                  shadow-sm hover:shadow-md
                "
              >
                <HiHome aria-hidden="true" className="w-4 h-4" />
                Voltar ao Dashboard
              </Link>

              {/* Secondary — Go back (button with router.back) */}
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Voltar para a página anterior"
                className="
                  flex-1 inline-flex items-center justify-center gap-2
                  bg-white hover:bg-[#F3F4F6] active:bg-gray-100
                  text-[#374151] text-sm font-semibold
                  py-3.5 px-5 rounded-xl
                  border border-gray-200 hover:border-gray-300
                  transition-all duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
                "
              >
                <HiArrowLeft aria-hidden="true" className="w-4 h-4 text-[#6B7280]" />
                Página anterior
              </button>
            </div>

          </div>

          {/* ---- Card footer — identical token set to error.tsx ---- */}
          <div className="border-t border-gray-100 bg-[#F9FAFB] px-8 py-4 md:px-10">
            <p className="text-center text-[0.8125rem] text-[#6B7280]">
              Precisa de ajuda?{' '}
              <a
                href="mailto:suporte@example.com"
                className="
                  text-[#3B82F6] hover:text-[#2563EB]
                  font-medium underline-offset-2 hover:underline
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:rounded
                  focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                "
              >
                Contate o suporte técnico
              </a>
            </p>
          </div>

        </div>
      </main>
    </>
  );
}