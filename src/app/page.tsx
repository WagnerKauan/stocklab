import { CardMain } from '@/components/layout/cardMain';
import { NavBar } from '@/components/layout/navBar';
import { Sidebar } from '@/components/layout/sidebar';
import { CardDashboard } from './(private)/dashboard/_components/cardDashboard';
import { CardProductLowStock } from './(private)/dashboard/_components/cardProductLowStock';
import { TitleSection } from '@/components/ui/titleSection';
import { FiBox } from 'react-icons/fi';
import { Tags } from './(private)/dashboard/_components/tags';

export default function Home() {

  const tags = [
    'Todas',
    'Jaquetas',
    'Saias',
    'Blusas',
    'Calças',
    'Vestidos',
    'blazers',
    'Shorts',
    'Camisas',
  ];

  return (
    <div className="bg-background-normal">
      hellow world
    </div>
  );
}
