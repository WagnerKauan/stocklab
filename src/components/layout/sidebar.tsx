'use client';

import { GoSidebarExpand } from 'react-icons/go';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { FiPackage } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { GoSidebarCollapse } from 'react-icons/go';
import { useState } from 'react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const href = '/dashboard';

  const navLinks = {
    mainLinks: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: (
          <FiHome
            className={` transition-all duration-300 ${!isCollapsed ? 'text-lg' : 'text-2xl'}`}
          />
        ),
      },
      {
        name: 'Produtos',
        href: '/produtos',
        icon: (
          <FiPackage
            className={` transition-all duration-300 ${!isCollapsed ? 'text-lg' : 'text-2xl'}`}
          />
        ),
      },
    ],

    systemLinks: [
      {
        name: 'Perfil',
        href: '/perfil',
        icon: (
          <FiUser
            className={` transition-all duration-300 ${!isCollapsed ? 'text-lg' : 'text-2xl'}`}
          />
        ),
      },
      {
        name: 'Configurações',
        href: '/configuracoes',
        icon: (
          <FiSettings
            className={` transition-all duration-300 ${!isCollapsed ? 'text-lg' : 'text-2xl'}`}
          />
        ),
      },
    ],
  };

  return (
    <aside
      className={` hidden md:flex  ${isCollapsed ? 'w-22 px-3 py-6 rounded-2xl' : 'lg:w-64 xl:w-96 p-6 rounded-3xl'} transition-[width,padding,border-radius] 
      duration-300 ease-in-out max-w-60 h-full border border-secondary-light/20 flex flex-col justify-between bg-white`}
    >
      <div>
        {/* LOGO */}
        <div
          className={`flex items-center  ${!isCollapsed ? 'justify-between' : 'justify-center'}`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ${!isCollapsed ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
          >
            <Logo />
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer text-secondary-dark hover:text-primary-normal transition-colors"
          >
            {isCollapsed ? (
              <GoSidebarExpand size={24} />
            ) : (
              <GoSidebarCollapse size={24} />
            )}
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {/* PRINCIPAL */}
          <div className="flex flex-col  gap-4">
            {!isCollapsed && (
              <span className="uppercase text-secondary-light text-[14px]">
                principal
              </span>
            )}
            {navLinks.mainLinks.map(link => {
              if (link.href === href) {
                return (
                  <Button
                    key={link.href}
                    text={link.name}
                    icon={link.icon}
                    variant="primary"
                    alingment={!isCollapsed ? 'left' : 'center'}
                    collapse={isCollapsed}
                    className={` ${isCollapsed && 'py-6 flex items-center justify-center'}`}
                  />
                );
              }

              return (
                <Button
                  key={link.href}
                  text={link.name}
                  icon={link.icon}
                  variant="tertiary"
                  alingment={!isCollapsed ? 'left' : 'center'}
                  collapse={isCollapsed}
                  className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                />
              );
            })}
          </div>

          {/* SISTEMA */}
          <div className="flex flex-col gap-4 ">
            {!isCollapsed && (
              <span className="uppercase text-secondary-light text-[14px]">
                Sistema
              </span>
            )}
            {navLinks.systemLinks.map(link => {
              if (link.href === href) {
                return (
                  <Button
                    key={link.href}
                    text={link.name}
                    icon={link.icon}
                    variant="primary"
                    alingment={!isCollapsed ? 'left' : 'center'}
                    collapse={isCollapsed}
                    className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                  />
                );
              }

              return (
                <Button
                  key={link.href}
                  text={link.name}
                  icon={link.icon}
                  variant="tertiary"
                  alingment={!isCollapsed ? 'left' : 'center'}
                  collapse={isCollapsed}
                  className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <Button
          className={`hover:bg-error ${isCollapsed && 'py-6 flex items-center justify-center'}`}
          text={isCollapsed ? '' : 'Sair'}
          icon={<FiLogOut size={18} />}
          variant="secondary"
          alingment={!isCollapsed ? 'left' : 'center'}
        />
      </div>
    </aside>
  );
}
