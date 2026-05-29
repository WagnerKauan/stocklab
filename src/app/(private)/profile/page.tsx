"use server";

import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import { FiUser } from 'react-icons/fi';
import { ProfileSettings } from './_components/profile-information';
import { ProfileSecurity } from './_components/profile-security';
import { ProfilePreferences } from './_components/profile-preferences';
import { ProfileDangerZone } from './_components/profile-danger-zone';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';

export default async function Profile() {

  const user = await getCurrentUser()

  if(!user) return redirect('/login');

  return (
    <div>
      <CardMain>
        <TitleSection
          title="Meu perfil"
          paragrafo="Gerencie as configurações e preferências da sua conta."
          icon={<FiUser size={32} color="#FFF" />}
          typeTitle="info"
        />
        <hr className="text-secondary-light/20 mt-8" />

        <div className="w-full h-full max-w-[70%] mx-auto mt-8">
          <ProfileSettings {...user} />
          <ProfileSecurity />
          <ProfilePreferences />
          <ProfileDangerZone />
        </div>
      </CardMain>
    </div>
  );
}
