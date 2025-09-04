import React from 'react';

export const RightSidebar: React.FC = () => {
  return (
    <aside className='w-20 bg-gray-950 border-l border-gray-700 fixed top-15 right-0 bottom-0 flex flex-col items-center py-5'>
      <div className='flex flex-col gap-4 mb-10'>
        <button className='w-12 h-12 rounded-xl border-none bg-gray-800 text-white cursor-pointer flex flex-col items-center justify-center gap-1 text-xs transition-all relative hover:bg-gray-700 hover:-translate-y-0.5'>
          <span className='text-base'>↑</span>
          <span>Send</span>
        </button>

        <button className='w-12 h-12 rounded-xl border-none bg-gray-800 text-white cursor-pointer flex flex-col items-center justify-center gap-1 text-xs transition-all relative hover:bg-gray-700 hover:-translate-y-0.5'>
          <span className='text-base'>↓</span>
          <span>Receive</span>
        </button>

        <button className='w-12 h-12 rounded-xl border-none bg-gray-800 text-white cursor-pointer flex flex-col items-center justify-center gap-1 text-xs transition-all relative hover:bg-gray-700 hover:-translate-y-0.5'>
          <span className='text-base'>🔄</span>
          <span>Swap</span>
        </button>
      </div>

      <div
        className='absolute bottom-5 right-3 text-xs text-gray-500 flex items-center gap-2'
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span>Not Guardian</span>
        <span className='text-sm text-emerald-400'>ℹ️</span>
      </div>
    </aside>
  );
};
