import React from 'react';
import QRCode from 'react-qr-code';

interface ReceiveModalProps {
  address: string;
  onClose: () => void;
}

export const ReceiveModal: React.FC<ReceiveModalProps> = ({
  address,
  onClose
}) => {
  return (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center z-[2000]'
      onClick={onClose}
    >
      <div
        className='bg-gray-900 rounded-xl p-6 min-w-[400px] border border-gray-700'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-xl font-semibold'>Receive</h2>
          <button
            className='bg-transparent border-none text-white text-2xl cursor-pointer'
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className='text-center mb-5'>
          <QRCode value={address} size={200} />
        </div>
        <div>
          <label className='block mb-2 text-sm text-gray-400'>
            Your Address:
          </label>
          <div className='flex gap-2 bg-gray-800 p-3 rounded-lg'>
            <span className='flex-1 font-mono text-xs'>{address}</span>
            <button
              className='bg-emerald-400 text-black px-3 py-1 rounded text-sm font-medium'
              onClick={() => navigator.clipboard.writeText(address)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
