'use client';

import { actionGetAvatarUrl } from '@/actions/profile/action-get-avatar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';

export function NavBar() {
  const [avatar, setAvatar] = useState('');
  async function getAvatar() {
    const url = await actionGetAvatarUrl();
    return url;
  }
  const href = usePathname();

  const links = {
    '/dashboard': 'Dashboard',
    '/products': 'Produtos',
    '/profile': 'Perfil',
    '/products/newProduct': 'Novo Produto',
    '/movements': 'Movimentações',
  };

  useEffect(() => {
    async function fetchAvatar() {
      const url = await getAvatar();

      console.log(url);
      if (url) {
        setAvatar(url);
      }
    }

    fetchAvatar();
  }, []);


  return (
    <header className="max-h-17.5 bg-white w-full rounded-3xl py-2 xl:py-3 px-4 xl:px-6 flex items-center justify-between border border-secondary-light/20">
      <span className="text-secondary-dark text-md xl:text-lg ">{links[href as keyof typeof links] || 'Informações do produto'}</span>

      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          <FiBell className="text-secondary-dark text-2xl xl:text-[32px]" />
        </div>

        <div className="w-12 h-12 rounded-full bg-background-normal overflow-hidden border border-secondary-light/20">
          <Image src={avatar || '/avatar-placeholder3.png'} alt="avatar" width={100} height={100} className=' w-full h-full object-cover' />
        </div>
      </div>
    </header>
  );
}
