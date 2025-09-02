// src/pages/Unlock/Unlock.tsx

import React, { useState } from 'react';
import { MxLink } from 'components';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  XaliasLoginButton
} from 'components/sdkDapp.components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import {
  LedgerLoginButtonPropsType,
  OperaWalletLoginButtonPropsType,
  WalletConnectLoginButtonPropsType
} from 'types';
import { AuthRedirectWrapper } from 'wrappers';
import { Keystore, Pem } from './components';
import { useUnlockRedirect } from './hooks';
import { nativeAuth } from '../../config/sharedConfig';
import { CreateRecoverRoutesEnum } from '../CreateRecover/routes';
import './Unlock.css'; // Import the new CSS file

// ---- TopBar Component ----
// This can be moved to its own file (e.g., components/TopBar.tsx) for better organization
function TopBar() {
  const [network, setNetwork] = useState('Devnet');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(e.target.value);
  };
  return (
    <header className='mx-topbar' role='banner'>
      <div className='mx-topbar__left'>
        <div className='mx-brand'>
          <svg
            className='mx-brand__glyph'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              d='M3 6.5l3.6-2.3L12 9.2l5.4-5 3.6 2.3-5.6 5.1 5.6 6.2-3.6 2.3L12 14.7 6.6 20.1 3 17.8l5.8-6.2L3 6.5z'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='mx-brand__divider' aria-hidden='true' />
          <span className='mx-brand__label'>
            Wallet <span className='mx-brand__sub'>({network})</span>
          </span>
        </div>
      </div>
      <div className='mx-topbar__center'>
        <h1 className='mx-title'>Connect your wallet</h1>
      </div>
      <div className='mx-topbar__right'>
        <button className='mx-circle' aria-label='Help'>
          <svg width='25' height='25' viewBox='0 0 24 24' aria-hidden='true'>
            <circle
              cx='12'
              cy='12'
              r='9'
              stroke='currentColor'
              strokeWidth='1.6'
              fill='none'
            />
            <path
              d='M9.7 9.1a2.6 2.6 0 014.6 1.5c0 1.6-1.5 1.9-2.2 2.5-.4.3-.6.7-.6 1.3'
              stroke='currentColor'
              strokeWidth='1.6'
              strokeLinecap='round'
              fill='none'
            />
            <circle cx='12' cy='17.2' r='1' fill='currentColor' />
          </svg>
        </button>
        <button className='mx-circle' aria-label='Apps'>
          <svg width='25' height='25' viewBox='0 0 24 24' aria-hidden='true'>
            <rect x='3' y='3' width='5' height='5' rx='1' fill='currentColor' />
            <rect
              x='10'
              y='3'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='17'
              y='3'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='3'
              y='10'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='10'
              y='10'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='17'
              y='10'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='3'
              y='17'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='10'
              y='17'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
            <rect
              x='17'
              y='17'
              width='5'
              height='5'
              rx='1'
              fill='currentColor'
            />
          </svg>
        </button>
        <select className='mx-dropdown' value={network} onChange={handleChange}>
          <option value='Devnet'>Devnet</option>
          <option value='Mainnet'>Mainnet</option>
          <option value='Sovereign'>Sovereign</option>
          <option value='Testnet'>Testnet</option>
        </select>
      </div>
    </header>
  );
}

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const onUnlockRedirect = useUnlockRedirect();

  const commonProps: CommonPropsType = {
    callbackRoute: routeNames.dashboard,
    nativeAuth,
    onLoginRedirect: () => onUnlockRedirect()
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='app'>
        <div className='topbar-outer'>
          <TopBar />
        </div>
        <main className='container' data-testid={DataTestIdsEnum.unlockPage}>
          <section className='hero card'>
            <div className='hero__left'>
              <div className='brand'>
                <span className='brand__mark'>xPortal</span>
                <span className='pill'>On-Chain 2FA</span>
              </div>
              <h2 className='hero__title'>Connect effortlessly.</h2>
              <p className='hero__subtitle'>
                Scan the QR code with your xPortal app.
              </p>
              <div className='hero__helper'>
                {/* Functional xPortal Button */}
                <WalletConnectLoginButton
                  loginButtonText='Connect xPortal App'
                  {...commonProps}
                />
              </div>
            </div>
            <div className='hero__qrWrap'>
              <div className='qrCard'>
                <div className='qr' />
              </div>
            </div>
          </section>

          <section className='grid'>
            {/* Functional Extension Button */}
            <ExtensionLoginButton
              loginButtonText='DeFi Wallet'
              {...commonProps}
            />
            {/* Functional Ledger Button */}
            <LedgerLoginButton loginButtonText='Ledger' {...commonProps} />
            {/* Functional Opera Button */}
            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />
          </section>

          <section className='columns'>
            <div className='card'>
              <h3 className='sectionTitle'>Advanced Options</h3>
              <div className='chips'>
                {/* Functional Keystore, Pem, and xAlias Buttons */}
                <Keystore />
                <Pem />
                <XaliasLoginButton
                  loginButtonText='xAlias'
                  data-testid='xAliasLoginBtn'
                  {...commonProps}
                />
              </div>
            </div>
            <div className='card helper'>
              <h3 className='sectionTitle'>Don't have a Wallet?</h3>
              <ul className='links'>
                {/* Functional Create/Recover Links */}
                <li>
                  <MxLink
                    data-testid={DataTestIdsEnum.createWalletBtn}
                    to={CreateRecoverRoutesEnum.create}
                    className='link'
                  >
                    Create new wallet
                  </MxLink>
                </li>
                <li>
                  <MxLink
                    data-testid={DataTestIdsEnum.recoverWalletBtn}
                    to={CreateRecoverRoutesEnum.recover}
                    className='link'
                  >
                    Recover wallet
                  </MxLink>
                </li>
              </ul>
            </div>
          </section>
        </main>
        <footer className='footer'>
          Devnet Build 1.15.7-babf6b0a3
          <br />
          Made with ❤️ by the MultiversX team, 2025
        </footer>
      </div>
    </AuthRedirectWrapper>
  );
};
