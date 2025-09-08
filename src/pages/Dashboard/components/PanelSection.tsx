import React, { useState } from 'react';
import { WidgetType } from 'types/widget.types';
import { Widget } from './Widget';

interface PanelsSectionProps {
  widgets: WidgetType[];
}

export const PanelsSection: React.FC<PanelsSectionProps> = ({ widgets }) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const nftsWidget = widgets.find((w) => w.title === 'NFTs');
  const transactionsWidget = widgets.find((w) => w.title === 'Transactions');

  const buyProviders = [
    'Transak',
    'MoonPay',
    'Ramp Network',
    'CoinSpot',
    'Guardarian',
    'Coinmerce',
    'Tokero',
    'Tradesilvania',
    'Indacoin',
    'CryptoCoin.Pro',
    'Changelly'
  ];

  return (
    <div className='grid gap-6'>
      {/* Validator Panel */}
      <div className='bg-gray-900 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-lg font-semibold'>Validators</h3>
          <button className='bg-transparent border border-emerald-400 text-emerald-400 px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:bg-emerald-400 hover:text-black'>
            Open Dashboard
          </button>
        </div>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <h4 className='text-sm text-gray-400 mb-2 font-medium'>
              Active Validators
            </h4>
            <div className='text-xl font-semibold mb-1'>0 Nodes</div>
            <div className='text-sm text-gray-500'>Up to 49.98% APY</div>
          </div>
          <div>
            <h4 className='text-sm text-gray-400 mb-2 font-medium'>
              Your Validator Stake
            </h4>
            <div className='text-xl font-semibold mb-1'>0 xEGLD</div>
            <div className='text-sm text-gray-500'>≈ $0.00</div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        {/* Tokens Panel */}
        <div className='bg-gray-900 rounded-xl p-6 border border-gray-700'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-lg font-semibold'>Tokens</h3>
            <span className='bg-gray-700 text-gray-400 px-2 py-1 rounded-xl text-xs ml-auto mr-3'>
              0
            </span>
            <button className='bg-transparent border border-emerald-400 text-emerald-400 px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:bg-emerald-400 hover:text-black'>
              View All
            </button>
          </div>
          <div className='text-center py-10'>
            <div className='text-5xl mb-4 opacity-50'>ℹ️</div>
            <div className='text-base font-semibold mb-2'>No tokens owned!</div>
            <div className='text-sm text-gray-500'>
              Your tokens will appear here.
            </div>
          </div>
        </div>

        {/* Staking Panel */}
        <div className='bg-gray-900 rounded-xl p-6 border border-gray-700'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-lg font-semibold'>Staking</h3>
            <button className='bg-transparent border border-emerald-400 text-emerald-400 px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:bg-emerald-400 hover:text-black'>
              Open Dashboard
            </button>
          </div>
          <div className='text-center p-5'>
            <div className='text-sm text-gray-400 mb-5 leading-relaxed'>
              By staking your xEGLD you earn rewards and help keep the
              MultiversX Network secure.
            </div>
            <button
              className='bg-emerald-400 text-black border-none px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/30'
              onClick={() => setShowBuyModal(true)}
            >
              Buy xEGLD
            </button>
          </div>
        </div>
      </div>

      {/* NFTs Panel */}
      <div className='bg-gray-900 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-lg font-semibold'>NFTs & SFTs</h3>
          <span className='bg-gray-700 text-gray-400 px-2 py-1 rounded-xl text-xs ml-auto mr-3'>
            0
          </span>
          <button className='bg-transparent border border-emerald-400 text-emerald-400 px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:bg-emerald-400 hover:text-black'>
            View All
          </button>
        </div>
        {nftsWidget && <Widget {...nftsWidget} />}
      </div>

      {/* Transactions Panel */}
      <div className='bg-gray-900 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-lg font-semibold'>Transactions</h3>
          <span className='bg-gray-700 text-gray-400 px-2 py-1 rounded-xl text-xs ml-auto mr-3'>
            0
          </span>
          <button className='bg-transparent border border-emerald-400 text-emerald-400 px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:bg-emerald-400 hover:text-black'>
            View All
          </button>
        </div>
        {transactionsWidget && <Widget {...transactionsWidget} />}
      </div>

      {/* Buy xEGLD Modal */}
      {showBuyModal && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center'>
          <div className='bg-gray-900 text-white rounded-xl p-6 w-[400px] max-h-[80vh] overflow-y-auto relative'>
            <button
              onClick={() => setShowBuyModal(false)}
              className='absolute top-2 right-3 text-white text-2xl'
            >
              ×
            </button>
            <h2 className='text-xl font-semibold mb-4 text-center'>
              Buy Providers
            </h2>
            <div className='space-y-3'>
              {buyProviders.map((provider, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all'
                >
                  <div className='font-medium'>{provider}</div>
                  <div className='text-white text-lg'>→</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
