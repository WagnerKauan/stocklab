'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { NavBar } from './navBar';
import { SidebarMobile } from './sidebarMobile';

export function DashboardLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-full">
      <div className="hidden lg:block fixed left-0 top-0 h-screen  z-10 ">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div className='lg:hidden w-full'>
        <SidebarMobile />
      </div>

      {/* Main */}
      <div
        className={`w-full ${isCollapsed ? 'lg:pl-28' : 'lg:pl-66'} transition-[padding] 
          lg:py-6 lg:pr-6 pr-4 py-4 pl-4 duration-300 ease-in-out flex flex-col 
          gap-4 pb-24 lg:gap-6 h-full overflow-y-auto`}
      >
        <NavBar />

        {children}
      </div>
    </div>
  );
}
