'use client';

import { GoSidebarExpand } from 'react-icons/go';
import { Logo } from '../ui/logo';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { FiPackage } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { GoSidebarCollapse } from 'react-icons/go';
import { AnchorHTMLAttributes, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const href = usePathname();

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
        href: '/products',
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
        href: '/profile',
        icon: (
          <FiUser
            className={` transition-all duration-300 ${!isCollapsed ? 'text-lg' : 'text-2xl'}`}
          />
        ),
      },
      {
        name: 'Configurações',
        href: '/settings',
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
                  <NavLink
                    key={link.href}
                    text={link.name}
                    icon={link.icon}
                    variant="primary"
                    alingment={!isCollapsed ? 'left' : 'center'}
                    collapse={isCollapsed}
                    className={` ${isCollapsed && 'py-6 flex items-center justify-center'}`}
                    href={link.href}
                  />
                );
              }

              return (
                <NavLink
                  key={link.href}
                  text={link.name}
                  icon={link.icon}
                  variant="tertiary"
                  alingment={!isCollapsed ? 'left' : 'center'}
                  collapse={isCollapsed}
                  className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                  href={link.href}
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
                  <NavLink
                    key={link.href}
                    text={link.name}
                    icon={link.icon}
                    variant="primary"
                    alingment={!isCollapsed ? 'left' : 'center'}
                    collapse={isCollapsed}
                    className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                    href={link.href}
                  />
                );
              }

              return (
                <NavLink
                  key={link.href}
                  text={link.name}
                  icon={link.icon}
                  variant="tertiary"
                  alingment={!isCollapsed ? 'left' : 'center'}
                  collapse={isCollapsed}
                  className={`${isCollapsed && 'py-6 flex items-center justify-center'}`}
                  href={link.href}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* SAIR */}
      <div>
        <NavLink
          text={isCollapsed ? '' : 'Sair'}
          icon={<FiLogOut size={18} />}
          href="/dashboard"
          variant="secondary"
          alingment={!isCollapsed ? 'left' : 'center'}
          collapse={isCollapsed}
          className={`hover:bg-error ${isCollapsed && 'py-6 flex items-center justify-center '}`}
        />
      </div>
    </aside>
  );
}

type variantButton = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  variant: variantButton;
  alingment?: 'left' | 'center';
  collapse?: boolean;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({
  text,
  icon,
  variant,
  alingment = 'left',
  collapse = false,
  ...props
}: ButtonProps) {
  

  const variantsButton: Record<variantButton, string> = {
    primary:
      'bg-primary-normal text-white hover:bg-primary-hover transition-colors duration-200',

    secondary:
      'bg-secondary-dark text-white hover:bg-[#0F172A] transition-colors duration-200 ',

    tertiary:
      'bg-background-normal text-secondary-dark border border-secondary-light/20 hover:bg-[#E5E7EB] hover:border-secondary-light/40 transition-colors duration-200',
  };

  return (
    <Link
      {...props}
      className={`block max-h-10 py-2 px-4 w-full rounded-lg cursor-pointer  ${variantsButton[variant]} ${props.className}`}
    >
      <div
        className={`flex ${alingment === 'left' ? 'justify-start' : 'justify-center'} items-center ${!collapse && 'gap-2'}`}
      >
        {icon}

        <span
          className={`transition-all ease-in-out duration-200  ${!collapse ? 'opacity-100' : 'opacity-0 w-0'}`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}
