"use client";

import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";




type PaginationProps = {
  itensPerPage: number,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>
  totalItens: number
  selectedPage?: number
};

export function Pagination({ itensPerPage, totalItens, setStartIndex, selectedPage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(selectedPage ?? 1);
  const totalPages =
    Math.ceil(totalItens / itensPerPage);

  useEffect(() => {
    if (selectedPage) {
      setCurrentPage(selectedPage);
      setStartIndex((selectedPage - 1) * itensPerPage);
    }
  }, [totalItens, selectedPage]);

  function handlePagination(page: number) {
    if (page < 1) return;
    if (page > Math.ceil(totalItens / itensPerPage)) return;
    if (currentPage === page) return;

    setCurrentPage(page);
    setStartIndex((page - 1) * itensPerPage);
  }

  function getVisiblePages() {

    const pages = [];

    for (
      let i = currentPage - 1;
      i <= currentPage + 1;
      i++
    ) {
      if (i >= 1 && i <= totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }

  const classActivePage = "bg-primary-normal hover:bg-primary-hover text-white";

  return (

    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-0 items-center justify-center mt-6 w-full relative">
      <span className="text-sm text-secondary-light sm:absolute sm:left-0 self-start">
        Mostrando {currentPage} de {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          className="h-9 min-w-9 px-3 rounded-lg border border-secondary-light/20 bg-white text-sm
          text-secondary-normal hover:bg-background-normal transition-colors cursor-pointer flex items-center gap-1"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {

          getVisiblePages().map((index) => (
            <button
              key={index}
              className={`h-9 min-w-9 px-3 rounded-lg border border-secondary-light/20 text-sm 
            transition-colors cursor-pointer flex items-center justify-center gap-1 
              ${index === currentPage ? classActivePage : 'bg-white hover:bg-background-normal text-secondary-normal'}`}
              onClick={() => handlePagination(index)}
            >
              {index}
            </button>
          ))}

        <button
          onClick={() => handlePagination(currentPage + 1)}
          className="h-9 min-w-9 px-3 rounded-lg border border-secondary-light/20 bg-white
          text-sm text-secondary-normal hover:bg-background-normal transition-colors cursor-pointer flex items-center gap-1">
          <span className="hidden sm:inline">Próximo</span>
          <FiArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}