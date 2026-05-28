import { CardMain } from '@/components/layout/cardMain';
import { TitleSection } from '@/components/ui/titleSection';
import { FiUser } from 'react-icons/fi';
import { ProfileSettings } from './_components/profile-information';
import { ProfileSecurity } from './_components/profile-security';

export default function Profile() {
  return (
    <CardMain>
      <TitleSection
        title="Meu perfil"
        paragrafo="Gerencie as configurações e preferências da sua conta."
        icon={<FiUser size={32} color="#FFF" />}
        typeTitle="info"
      />
      <hr className="text-secondary-light/20 mt-8" />

      <div className='w-full h-full max-w-[70%] mx-auto overflow-y-auto pr-4 pb-22 mt-8'>
        <ProfileSettings />

        <ProfileSecurity />
        <ProfileSecurity />
        <ProfileSecurity />
      </div>
    </CardMain>
  );
}
// xl:max-w-[60%] overflow-y-auto pr-4 pb-22