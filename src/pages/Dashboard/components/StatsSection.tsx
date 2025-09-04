import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <div className='grid grid-cols-3 gap-10 mb-10 text-center'>
      <div className='p-5'>
        <div className='text-sm text-gray-400 mb-2'>Available xEGLD</div>
        <div className='text-lg font-medium mb-1 flex items-center justify-center gap-2'>
          <span>✖️ 0</span>
        </div>
        <div className='text-sm text-gray-500'>$0.00</div>
      </div>

      <div className='p-5'>
        <div className='text-sm text-gray-400 mb-2'>Staked xEGLD</div>
        <div className='text-lg font-medium mb-1 flex items-center justify-center gap-2'>
          <span>✖️ 0</span>
        </div>
        <div className='text-sm text-gray-500'>$0.00</div>
      </div>

      <div className='p-5'>
        <div className='text-sm text-gray-400 mb-2'>Other Tokens ℹ️</div>
        <div className='text-lg font-medium mb-1 flex items-center justify-center gap-2'>
          <span>Unavailable</span>
        </div>
        <div className='text-sm text-gray-500'>≈ $0.00</div>
      </div>
    </div>
  );
};
