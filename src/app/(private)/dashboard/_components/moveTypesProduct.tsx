"use client";

import { useEffect, useRef } from "react";


type MoveTypesProductProps = {

  typeProducts: string[],
  typeClick: (type: string) => void
  typeActive: string
};

export function MoveTypesProduct({ typeProducts, typeClick, typeActive }: MoveTypesProductProps) {

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const animationFrame = useRef<number>(0);


  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current!.offsetLeft;
    scrollLeft.current = scrollRef.current!.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    cancelAnimationFrame(animationFrame.current);
    scrollRef.current!.style.cursor = 'grabbing';
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = x - startX.current;
    velocity.current = e.pageX - lastX.current; // calcula velocidade
    lastX.current = e.pageX;
    scrollRef.current!.scrollLeft = scrollLeft.current - walk;
  }

  function onMouseUp() {
    isDragging.current = false;
    scrollRef.current!.style.cursor = 'grab';
    startMomentum(); // dispara a inércia ao soltar
  }

  function startMomentum() {
    if (Math.abs(velocity.current) < 0.5) return; // para quando lento o suficiente

    velocity.current *= 0.98; // fator de desaceleração (0.9 = freia rápido, 0.98 = freia devagar)
    scrollRef.current!.scrollLeft -= velocity.current;

    animationFrame.current = requestAnimationFrame(startMomentum);
  }

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="flex-1 overflow-x-auto scrollbar-none max-w-5xl w-full">
      <div className="flex gap-4">
        {typeProducts.map(type => (
          <button
            key={type}
            className={`flex items-center justify-center bg-background-normal rounded-lg px-8 py-2 text-[14px] font-medium whitespace-nowrap
                    hover:bg-secondary-normal hover:text-white text-secondary-normal cursor-pointer transition-colors
                ${typeActive === type ? 'bg-secondary-normal text-white' : ''}`}
            onClick={() => typeClick(type)}
          >
            {type}
          </button>
        ))}

      </div>
    </div>
  )
}