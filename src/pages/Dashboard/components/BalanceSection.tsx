import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ReceiveModal } from './ReceiveModal';

export const BalanceSection: React.FC = () => {
  const { account } = useGetAccountInfo();
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false); // <-- New

  const buyProviders = [
    {
      name: 'Binance',
      logo: '🌐',
      link: 'https://www.binance.com/en/trade/EGLD_USDT?theme=dark&type=spot'
    },
    {
      name: 'Coinbase',
      logo: '🌕',
      link: 'https://www.coinbase.com/en-in/price/multiversx'
    },
    {
      name: 'kraken',
      logo: '🔁',
      link: 'https://pro.kraken.com/app/trade/egld-usd'
    },
    {
      name: 'CoinSpot',
      logo: '🪙',
      link: 'https://www.coinspot.com.au/buy/egld'
    },
    { name: 'Guardarian', logo: '🛡️', link: 'https://guardarian.com/buy-egld' },
    {
      name: 'Coinmerce',
      logo: '💱',
      link: 'https://coinmerce.io/en/multiversx/'
    },
    {
      name: 'Tokero',
      logo: '🚀',
      link: 'https://tokero.com/en/exchange/buy/egld/eur/'
    },
    {
      name: 'Tradesilvania',
      logo: '💹',
      link: 'https://tradesilvania.com/en/prices/elrond'
    },
    {
      name: 'Indacoin',
      logo: '💳',
      link: 'https://indacoin.io/buy-elrond-with-card'
    },
    {
      name: 'CryptoCoin.Pro',
      logo: '🏦',
      link: 'https://checkout.cryptocoin.pro/order/elrond?wallet=erd1kssm0d8tcl9t20snzgvnyqs4mqsvqa4upuq8thh9wu8q94ycasgqht2f4f'
    },
    {
      name: 'Changelly',
      logo: '🔄',
      link: 'https://changelly.com/buy?from=usd&to=EGLD'
    }
  ];

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
            onClick={() => setShowBuyModal(true)}
          >
            <span>💳</span> Buy xEGLD
          </button>
        </div>
      </div>

      {/* Decorative SVG */}
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

      {/* Receive Modal */}
      {showReceiveModal && (
        <ReceiveModal
          address={account.address}
          onClose={() => setShowReceiveModal(false)}
        />
      )}

      {/* Buy Modal */}
      {showBuyModal && (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center'>
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
                <a
                  key={index}
                  href={provider.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block'
                >
                  <div className='flex justify-between items-center bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all'>
                    <div className='flex items-center gap-3'>
                      <div className='text-2xl'>{provider.logo}</div>
                      <div className='font-medium'>{provider.name}</div>
                    </div>
                    <div className='text-white'>→</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
