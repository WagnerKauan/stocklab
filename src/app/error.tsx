'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HiRefresh, HiHome, HiShieldCheck } from 'react-icons/hi';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { RiAlertLine } from 'react-icons/ri';

// ---------------------------------------------------------------------------
// Inline animation keyframes — avoids any extra CSS file or Framer Motion dep
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
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0   rgba(239, 68, 68, 0.30); }
    70%  { box-shadow: 0 0 0 14px rgba(239, 68, 68, 0.00); }
    100% { box-shadow: 0 0 0 0   rgba(239, 68, 68, 0.00); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-6px); }
  }

  .anim-fade-up       { animation: fadeSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d1    { animation: fadeSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
  .anim-fade-up-d2    { animation: fadeSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
  .anim-fade-up-d3    { animation: fadeSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
  .anim-scale-in      { animation: scaleIn    0.45s cubic-bezier(0.16,1,0.3,1) both;         }
  .anim-pulse-ring    { animation: pulseRing  2.20s ease-out infinite;                        }
  .anim-float         { animation: floatY     3.50s ease-in-out infinite;                     }

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
// Types
// ---------------------------------------------------------------------------
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{animationStyles}</style>

      {/*
       * Full-screen backdrop
       * Subtle dot-grid pattern adds depth without distraction.
       */}
      <main
        role="main"
        aria-labelledby="error-heading"
        className="
          min-h-screen w-full
          flex items-center justify-center
          px-4 py-12
          bg-background-normal
        "
        style={{
          backgroundImage: `radial-gradient(circle, #D1D5DB 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      >
        {/* ----------------------------------------------------------------
         * Card
         * ---------------------------------------------------------------- */}
        <div
          className="
            relative w-full max-w-120
            bg-white rounded-3xl
            border border-gray-100
            overflow-hidden
            anim-fade-up
          "
          style={{ boxShadow: '0px 2px 6px rgba(17, 24, 39, 0.10), 0px 16px 48px rgba(17, 24, 39, 0.08)' }}
        >

          {/* Top accent bar */}
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
            }}
          />

          <div className="px-8 py-10 md:px-10">

            {/* ---- Status badge ---- */}
            <div className="flex justify-center mb-8 anim-fade-up">
              <span
                className="
                  inline-flex items-center gap-2
                  bg-red-50 text-error
                  text-xs font-semibold tracking-wide
                  px-3.5 py-1.5 rounded-full
                  border border-red-100
                "
              >
                <RiAlertLine aria-hidden="true" className="w-3.5 h-3.5" />
                Erro do Sistema
              </span>
            </div>

            {/* ---- Icon ---- */}
            <div className="flex justify-center mb-8 anim-scale-in" aria-hidden="true">
              {/* Outer pulse ring */}
              <div className="anim-pulse-ring rounded-full">
                {/* Float wrapper */}
                <div className="anim-float">
                  <div
                    className="
                      w-24 h-24 rounded-full
                      flex items-center justify-center
                      bg-linear-to-br from-red-50 to-red-100
                      border-2 border-red-200
                    "
                  >
                    <MdOutlineErrorOutline
                      className="w-12 h-12 text-error"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Heading ---- */}
            <div className="text-center mb-6 anim-fade-up-d1">
              <h1
                id="error-heading"
                className="
                  text-[1.65rem] md:text-3xl font-bold
                  text-secondary-dark tracking-tight
                  leading-tight mb-3
                "
              >
                Ops! Algo deu errado.
              </h1>

              <p className="text-secondary-light text-[0.9375rem] leading-relaxed">
                Ocorreu um erro inesperado no sistema. Nossa equipe foi notificada
                automaticamente e já está trabalhando para resolver o problema.
              </p>
            </div>

            {/* ---- Safety notice ---- */}
            <div
              className="
                flex items-start gap-3
                bg-green-50 border border-green-100
                rounded-2xl px-4 py-3.5
                mb-7
                anim-fade-up-d2
              "
              role="status"
              aria-label="Seus dados estão seguros"
            >
              <HiShieldCheck
                className="w-5 h-5 text-success mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-secondary-normal leading-snug">
                <span className="font-semibold text-[#16A34A]">Seus dados estão seguros.</span>{' '}
                Nenhuma informação foi perdida ou corrompida durante o erro.
              </p>
            </div>

            {/* ---- Error digest (debug reference) ---- */}
            {error.digest && (
              <div
                className="
                  flex items-center gap-2
                  bg-background-normal border border-gray-200
                  rounded-xl px-4 py-3 mb-7
                  anim-fade-up-d2
                "
                aria-label={`Código de referência do erro: ${error.digest}`}
              >
                <span className="text-[0.7rem] text-secondary-light uppercase tracking-wider font-semibold whitespace-nowrap">
                  Ref:
                </span>
                <code className="text-[0.8125rem] text-secondary-normal font-mono break-all">
                  {error.digest}
                </code>
              </div>
            )}

            {/* ---- CTA buttons ---- */}
            <div
              className="flex flex-col sm:flex-row gap-3 anim-fade-up-d3"
              role="group"
              aria-label="Ações disponíveis"
            >
              {/* Primary — Retry */}
              <button
                type="button"
                onClick={reset}
                aria-label="Tentar novamente carregar a página"
                className="
                  flex-1 inline-flex items-center justify-center gap-2
                  bg-primary-normal hover:bg-primary-hover active:bg-[#1D4ED8]
                  text-white text-sm font-semibold
                  py-3.5 px-5 rounded-xl
                  transition-all duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-primary-normal focus-visible:ring-offset-2
                  shadow-sm hover:shadow-md
                "
              >
                <HiRefresh aria-hidden="true" className="w-4 h-4" />
                Tentar novamente
              </button>

              {/* Secondary — Dashboard */}
              <Link
                href="/dashboard"
                aria-label="Voltar para o Dashboard principal"
                className="
                  flex-1 inline-flex items-center justify-center gap-2
                  bg-white hover:bg-background-normal active:bg-gray-100
                  text-secondary-normal text-sm font-semibold
                  py-3.5 px-5 rounded-xl
                  border border-gray-200 hover:border-gray-300
                  transition-all duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
                "
              >
                <HiHome aria-hidden="true" className="w-4 h-4 text-secondary-light" />
                Voltar ao Dashboard
              </Link>
            </div>

          </div>

          {/* ---- Card footer ---- */}
          <div className="border-t border-gray-100 bg-[#F9FAFB] px-8 py-4 md:px-10">
            <p className="text-center text-[0.8125rem] text-secondary-light">
              Problema persistindo?{' '}
              <a
                href="mailto:suporte@example.com"
                className="
                  text-primary-normal hover:text-primary-hover
                  font-medium underline-offset-2 hover:underline
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:rounded
                  focus-visible:ring-2 focus-visible:ring-primary-normal
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