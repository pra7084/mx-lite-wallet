import React from 'react';
import { useNavigate } from 'react-router-dom';
import GuardianSetup from 'pages/leftbar/Guardians/Guardian';
import LegacyDelegationDashboard from 'pages/leftbar/Legacy_Delegation';
import StakingDashboard from 'pages/leftbar/Stake';
import IssueNFTComponent from './IssueNftComponent';
import IssueTokenComponent from './IssueTokenComponent';
import SignMessageComponent from './SignMessageComponent';

export const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className='w-60 bg-gray-950 border-r border-gray-700 flex flex-col fixed top-15 left-0 bottom-0 overflow-y-auto max-h-[calc(100vh-3.75rem)]'>
      <div className='flex-1 overflow-y-auto'>
        <nav className='py-5'>
          <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors bg-gray-900 border-r-2 border-emerald-400 text-sm relative'>
            <span className='w-5 text-center opacity-80'>📊</span>
            <span>Dashboard</span>
          </div>

          <div
            className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
            onClick={() => handleNavigation('/hub')}
          >
            <span className='w-5 text-center opacity-80'>🔗</span>
            <span>Hub</span>
            <span className='bg-emerald-400 text-black text-xs px-1.5 py-0.5 rounded-full ml-auto font-semibold'>
              Beta
            </span>
          </div>

          <div
            className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
            onClick={() => handleNavigation('/transactions')}
          >
            <span className='w-5 text-center opacity-80'>📋</span>
            <span>Transactions</span>
          </div>

          <div
            className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
            onClick={() => handleNavigation('/tokens')}
          >
            <span className='w-5 text-center opacity-80'>🪙</span>
            <span>Tokens</span>
          </div>

          <div
            className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
            onClick={() => handleNavigation('/nfts')}
          >
            <span className='w-5 text-center opacity-80'>🖼️</span>
            <span>NFTs</span>
          </div>

          {/* Security Section */}
          <div className='mt-6'>
            <div className='text-xs text-gray-500 font-semibold tracking-wide px-5 pb-2'>
              SECURITY
            </div>
            <GuardianSetup />
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
              <span className='w-5 text-center opacity-80'>🛡️</span>
              <span>Guardian</span>
            </div> */}
          </div>

          {/* Staking Section */}
          <div className='mt-6'>
            <div className='text-xs text-gray-500 font-semibold tracking-wide px-5 pb-2'>
              STAKING
            </div>
            <StakingDashboard />
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
            <span className='w-5 text-center opacity-80'>💰</span>
            <span>Stake</span>
          </div> */}
            <div className='mt-6'>
              <div className='text-xs text-gray-500 font-semibold tracking-wide px-5 pb-2'>
                SECURITY
              </div>
              <LegacyDelegationDashboard />
              {/* Replace the old Guardian div with this component */}
            </div>
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
            <span className='w-5 text-center opacity-80'>🔄</span>
            <span>Legacy Delegation</span>
          </div> */}
          </div>

          {/* Tools Section */}
          <div className='mt-6'>
            <div className='text-xs text-gray-500 font-semibold tracking-wide px-5 pb-2'>
              TOOLS
            </div>
            <SignMessageComponent />
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
            <span className='w-5 text-center opacity-80'>✍️</span>
            <span>Sign Message</span>
          </div> */}
            <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
              <span className='w-5 text-center opacity-80'>🚰</span>
              <span>Faucet</span>
            </div>
            <IssueNFTComponent />
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
            <span className='w-5 text-center opacity-80'>🖼️</span>
            <span>Issue NFT</span>
          </div> */}
            <IssueTokenComponent />
            {/* <div className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'>
            <span className='w-5 text-center opacity-80'>🪙</span>
            <span>Issue Token</span>
          </div> */}
          </div>
        </nav>
      </div>
    </aside>
  );
};
