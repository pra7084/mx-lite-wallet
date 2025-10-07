import React from 'react';
import { useGetAccountInfo } from 'lib';

export const TopHeader: React.FC = () => {
  const { address } = useGetAccountInfo();

  return (
    <header className='h-15 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-5 fixed top-0 left-0 right-0 z-[1000]'>
      <div className='flex items-center'>
        <div className='flex items-center gap-2 text-base font-semibold'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M12 2L2 7V17L12 22L22 17V7L12 2Z' fill='#00D4AA' />
          </svg>
          <span>Wallet (Devnet)</span>
        </div>
      </div>

      <div className='flex-1 flex justify-center'>
        <div className='bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-mono'>
          <span className='opacity-70'>🔗</span>
          <span>{address}</span>
        </div>
      </div>

      <div className='flex gap-2'>
        <button className='w-9 h-9 bg-gray-800 border-none rounded-lg text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-700'>
          ?
        </button>
        <button className='w-9 h-9 bg-gray-800 border-none rounded-lg text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-700'>
          ⊞
        </button>
        <button className='w-9 h-9 bg-gray-800 border-none rounded-lg text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-700'>
          🔄
        </button>
        <button className='w-9 h-9 bg-gray-800 border-none rounded-lg text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-700'>
          ⋯
        </button>
      </div>
    </header>
  );
};
