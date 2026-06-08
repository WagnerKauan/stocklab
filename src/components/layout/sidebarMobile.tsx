"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPackage, FiSettings } from "react-icons/fi";
import { HiArrowsRightLeft } from "react-icons/hi2";



export function SidebarMobile() {


  const href = usePathname();

  const navLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <FiHome
        />
      ),
    },
    {
      name: 'Produtos',
      href: '/products',
      icon: (
        <FiPackage
        />
      ),
    },

    {
      name: 'Movimentações',
      href: '/movements',
      icon: (
        <HiArrowsRightLeft
        />
      ),
    },

    {
      name: 'Perfil',
      href: '/profile',
      icon: (
        <FiSettings
        />
      ),
    },
  ]


  return (
    <div className="fixed left-0 right-0 bottom-4 w-full z-10">

      <div className="bg-primary-normal border border-secondary-light/20 w-full max-w-75 mx-auto shadow-card
      flex items-center justify-between p-2 gap-2 rounded-full">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.href}
            href={navLink.href}
          >

            <div className={`flex items-center  justify-center p-3 rounded-full transition-colors text-xl
                ${href === navLink.href ? 'bg-background-normal text-secondary-dark' : 'text-white'} `}>
              {navLink.icon}
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}