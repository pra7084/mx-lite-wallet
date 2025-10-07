import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { TopHeader } from './TopHeader';

interface WalletLayoutProps {
  children: React.ReactNode;
}

export const WalletLayout: React.FC<WalletLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-black text-white font-sans flex flex-col'>
      <TopHeader />
      <div className='flex mt-15 min-h-[calc(100vh-60px)]'>
        <LeftSidebar />
        {children}
        <RightSidebar />
      </div>
    </div>
  );
};
