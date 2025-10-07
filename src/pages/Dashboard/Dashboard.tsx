import { useEffect } from 'react';
import { useScrollToElement } from 'hooks';
import { refreshAccount, useGetAccountInfo } from 'lib';
import { WidgetType } from 'types/widget.types';
import { AuthRedirectWrapper } from 'wrappers';
import { Account, NFTs, Tokens, Transactions } from './widgets';
import { WalletLayout } from './components/WalletLayout';
import { BalanceSection } from './components/BalanceSection';
import { StatsSection } from './components/StatsSection';
import { PanelsSection } from './components/PanelSection';

const WIDGETS: WidgetType[] = [
  {
    title: 'Tokens',
    widget: Tokens,
    description: 'Tokens for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTokens'
  },
  {
    title: 'NFTs',
    widget: NFTs,
    description: 'NFTs for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountNfts'
  },
  {
    title: 'Transactions',
    widget: Transactions,
    description: 'Transactions list for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  useScrollToElement();
  const { websocketEvent } = useGetAccountInfo();

  useEffect(() => {
    refreshAccount();
  }, [websocketEvent]);

  return (
    <AuthRedirectWrapper>
      <WalletLayout>
        <div className='flex-1 ml-60 mr-20 p-10 max-w-[calc(100vw-320px)]'>
          {/* Balance Section */}
          <BalanceSection />

          {/* Stats Section */}
          <StatsSection />

          {/* Enhanced Panels Section */}
          <PanelsSection widgets={WIDGETS} />

          {/* Legacy Account Widget (hidden, for backend functionality) */}
          <div className='hidden'>
            <Account />
          </div>
        </div>
      </WalletLayout>
    </AuthRedirectWrapper>
  );
};
