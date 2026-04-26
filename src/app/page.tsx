import { CardMain } from '@/components/layout/cardMain';
import { NavBar } from '@/components/layout/navBar';
import { Sidebar } from '@/components/layout/sidebar';
import { CardDashboard } from './(private)/dashboard/_components/cardDashboard';

export default function Home() {
  return (
    <div className='bg-background-normal'>
      <div className=" p-6 h-screen flex gap-6 ">
        <Sidebar />
        <div className='flex flex-col gap-6 w-full'>
          <NavBar />
          <div className='max-h-43.75 h-full grid grid-cols-3 gap-6'>
            <CardDashboard />
            <CardDashboard />
            <CardDashboard />
          </div>
          <CardMain />
        </div>
      </div>
    </div>
  );
}
