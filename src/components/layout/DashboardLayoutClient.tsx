'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { NavBar } from './navBar';

export function DashboardLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-full">
      <div className="fixed left-0 top-0 h-screen  z-10 pl-6 py-6">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main */}
      <div
        className={`w-full ${isCollapsed ? 'pl-34' : 'pl-72'} transition-[padding] py-6 pr-6 duration-300 ease-in-out flex flex-col 
          gap-6 h-full overflow-y-auto`}
      >
        <NavBar />

        {children}
      </div>
    </div>
  );
}
