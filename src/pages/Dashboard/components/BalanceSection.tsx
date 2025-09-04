import React, { useState } from 'react';
import { useGetAccountInfo } from 'lib';
import { ReceiveModal } from './ReceiveModal';

export const BalanceSection: React.FC = () => {
  const { account } = useGetAccountInfo();
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const handleBuyEGLD = () => {
    window.open('https://testnet-wallet.multiversx.com/buy', '_blank');
  };

  return (
    <div className='text-center mb-10'>
      <div className='mb-5'>
        <h1 className='text-7xl font-light mb-5 text-white'>$0.00</h1>
        <div className='flex gap-4 justify-center'>
          <button
            className='px-6 py-3 rounded-lg border-none text-sm font-medium cursor-pointer flex items-center gap-2 transition-all bg-gray-800 text-white hover:-translate-y-0.5'
            onClick={() => setShowReceiveModal(true)}
          >
            <span>↓</span> Receive
          </button>
          <button
            className='px-6 py-3 rounded-lg border-none text-sm font-medium cursor-pointer flex items-center gap-2 transition-all bg-emerald-400 text-black hover:-translate-y-0.5'
            onClick={handleBuyEGLD}
          >
            <span>💳</span> Buy xEGLD
          </button>
        </div>
      </div>

      <div className='h-25 my-10'>
        <svg className='w-full h-full' viewBox='0 0 800 100'>
          <path
            d='M0 50 Q200 30 400 40 T800 20'
            stroke='#00D4AA'
            strokeWidth='2'
            fill='none'
          />
        </svg>
      </div>

      {showReceiveModal && (
        <ReceiveModal
          address={account.address}
          onClose={() => setShowReceiveModal(false)}
        />
      )}
    </div>
  );
};
