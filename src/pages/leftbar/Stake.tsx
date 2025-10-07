import { useState, useEffect } from 'react';
import {
  Address,
  Transaction,
  ProxyNetworkProvider
  // NetworkConfig
} from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

// This is a common pattern for accessing the extension provider
const getExtensionProvider = () => {
  if (typeof window !== 'undefined' && (window as any).elrondWallet) {
    return (window as any).elrondWallet;
  }
  return null;
};

const StakingDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 30,
    seconds: 16
  });
  const [stakedBalance, setStakedBalance] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [stakeAmount, setStakeAmount] = useState<string>('');

  // State to hold the connected account information
  const [address, setAddress] = useState<string>('');
  const [network] = useState<any>({ chainID: 'D' }); // Default to Devnet

  // Function to connect to the wallet and get address
  const handleConnect = async () => {
    const provider = getExtensionProvider();
    if (provider) {
      try {
        const address = await provider.login();
        setAddress(address);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Could not connect to wallet.');
      }
    } else {
      alert('MultiversX wallet extension not found. Please install it.');
    }
  };

  useEffect(() => {
    // Automatically try to connect if address is not set
    if (!address) {
      handleConnect();
    }

    if (!isModalOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    fetchStakingInfo();

    return () => clearInterval(timer);
  }, [isModalOpen, address]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const CONTRACT_ADDRESS = 'staking.contract.address'; // Replace with your actual contract address
  const PROXY_URL = 'https://devnet-gateway.multiversx.com'; // Use devnet, testnet, or mainnet gateway

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sdkQueryViewFunction = async (funcName: string, _args: any[]) => {
    if (!address) return '0';
    if (funcName === 'getStakingPosition') return '1000000000000000000';
    if (funcName === 'getClaimableRewards') return '500000000000000000';
    return '0';
  };

  const fetchStakingInfo = async () => {
    if (!address) return;
    try {
      const staked = await sdkQueryViewFunction('getStakingPosition', [
        address
      ]);
      setStakedBalance(new BigNumber(staked).dividedBy(1e18));
      const rewards = await sdkQueryViewFunction('getClaimableRewards', [
        address
      ]);
      setClaimableRewards(new BigNumber(rewards).dividedBy(1e18));
    } catch (error) {
      console.error('Error fetching staking info:', error);
    }
  };

  const stakeNow = async () => {
    if (!address) return alert('Please connect your wallet');
    if (!stakeAmount || Number(stakeAmount) <= 0)
      return alert('Enter a valid stake amount');

    const provider = getExtensionProvider();
    const proxy = new ProxyNetworkProvider(PROXY_URL);

    try {
      // await NetworkConfig.getDefault().sync(proxy);
      const userAccount = await proxy.getAccount(new Address(address));

      const value = new BigNumber(stakeAmount).multipliedBy(1e18).toFixed(0);
      const data = new Uint8Array(Buffer.from('Stake'));

      const transaction = new Transaction({
        value: BigInt(value),
        data: data,
        sender: new Address(address),
        receiver: new Address(CONTRACT_ADDRESS),
        gasLimit: BigInt(60000000),
        chainID: network.chainID,
        nonce: BigInt(userAccount.nonce.valueOf())
      });

      const signedTransaction = await provider.signTransaction(transaction);
      const txHash = await proxy.sendTransaction(signedTransaction);

      alert(`Transaction sent! Hash: ${txHash}`);
      fetchStakingInfo();
    } catch (error) {
      console.error('Error sending staking tx:', error);
      alert('Transaction failed');
    }
  };

  return (
    <>
      {/* Sidebar Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>💰</span>
        <span>Stake</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-6xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl'
            >
              ×
            </button>
            <h1 className='text-white text-4xl font-light mb-12 text-center'>
              Staking Dashboard
            </h1>

            {!address ? (
              <div className='text-center'>
                <button
                  onClick={handleConnect}
                  className='bg-cyan-400 text-black font-semibold px-8 py-3 rounded-lg'
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className='flex flex-col md:flex-row gap-8'>
                <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                  <div className='text-gray-400 text-lg mb-4'>My Stake</div>
                  <div className='text-white text-3xl font-light'>
                    {stakedBalance.toFixed(4)} xEGLD
                  </div>
                </div>
                <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                  <div className='text-black text-lg mb-4 font-medium'>
                    My Claimable Rewards
                  </div>
                  <div className='text-black text-3xl font-light'>
                    {claimableRewards.toFixed(4)} xEGLD
                  </div>
                </div>
                <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                  <div className='text-gray-400 text-lg mb-6'>
                    Next Rewards Batch In
                  </div>
                  <div className='flex items-center gap-6 mb-8'>
                    <div className='text-center'>
                      <div className='text-cyan-400 text-4xl font-light'>
                        {formatTime(timeLeft.hours)}
                      </div>
                      <div className='text-gray-400 text-sm mt-1'>hours</div>
                    </div>
                    <div className='text-cyan-400 text-3xl font-light'>:</div>
                    <div className='text-center'>
                      <div className='text-cyan-400 text-4xl font-light'>
                        {formatTime(timeLeft.minutes)}
                      </div>
                      <div className='text-gray-400 text-sm mt-1'>minutes</div>
                    </div>
                    <div className='text-cyan-400 text-3xl font-light'>:</div>
                    <div className='text-center'>
                      <div className='text-cyan-400 text-4xl font-light'>
                        {formatTime(timeLeft.seconds)}
                      </div>
                      <div className='text-gray-400 text-sm mt-1'>seconds</div>
                    </div>
                  </div>
                  <input
                    type='number'
                    min='0'
                    step='0.01'
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder='Amount to stake'
                    className='mb-4 w-full px-4 py-3 rounded-lg text-black'
                  />
                  <button
                    onClick={stakeNow}
                    className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg'
                  >
                    Stake Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StakingDashboard;

// import { useState, useEffect } from 'react';
// import { Address, Transaction } from '@multiversx/sdk-core/out';
// import BigNumber from 'bignumber.js';
// import { useWallet } from '@multiversx/sdk-dapp/lib/sdkDappUtils';
// import { sendTransactions } from '@multiversx/sdk-dapp/services';
// import { refreshAccount } from '@multiversx/sdk-dapp/utils';

// const StakingDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 3,
//     minutes: 30,
//     seconds: 16
//   });
//   const [stakedBalance, setStakedBalance] = useState<BigNumber>(
//     new BigNumber(0)
//   );
//   const [claimableRewards, setClaimableRewards] = useState<BigNumber>(
//     new BigNumber(0)
//   );
//   const [stakeAmount, setStakeAmount] = useState<string>('');

//   const { address, account, network } = useWallet();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   useEffect(() => {
//     if (!isModalOpen) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { hours, minutes, seconds } = prev;
//         if (seconds > 0) seconds--;
//         else if (minutes > 0) {
//           seconds = 59;
//           minutes--;
//         } else if (hours > 0) {
//           seconds = 59;
//           minutes = 59;
//           hours--;
//         }
//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     fetchStakingInfo();

//     return () => clearInterval(timer);
//   }, [isModalOpen, address]);

//   const formatTime = (time: number) => time.toString().padStart(2, '0');

//   const CONTRACT_ADDRESS = 'staking.contract.address'; // Replace with your actual contract address

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const sdkQueryViewFunction = async (funcName: string, _args: any[]) => {
//     if (!address) return '0';
//     if (funcName === 'getStakingPosition') return '1000000000000000000';
//     if (funcName === 'getClaimableRewards') return '500000000000000000';
//     return '0';
//   };

//   const fetchStakingInfo = async () => {
//     if (!address) return;
//     try {
//       const staked = await sdkQueryViewFunction('getStakingPosition', [
//         address
//       ]);
//       setStakedBalance(new BigNumber(staked).dividedBy(1e18));

//       const rewards = await sdkQueryViewFunction('getClaimableRewards', [
//         address
//       ]);
//       setClaimableRewards(new BigNumber(rewards).dividedBy(1e18));
//     } catch (error) {
//       console.error('Error fetching staking info', error);
//     }
//   };

//   const stakeNow = async () => {
//     if (!address) return alert('Please connect your wallet');
//     if (!stakeAmount || Number(stakeAmount) <= 0)
//       return alert('Enter valid stake amount');

//     await refreshAccount();

//     try {
//       const value = new BigNumber(stakeAmount).multipliedBy(1e18).toFixed(0);
//       const data = new Uint8Array(Buffer.from('Stake'));
//       const transaction = new Transaction({
//         value: BigInt(value),
//         data: data,
//         sender: new Address(address),
//         receiver: new Address(CONTRACT_ADDRESS),
//         gasLimit: BigInt(60000000),
//         chainID: network.chainID,
//         nonce: account.nonce
//       });

//       // The sendTransactions service is used for sending transactions in v4.x
//       await sendTransactions({
//         transactions: transaction,
//         signWithoutSending: false,
//         transactionsDisplayInfo: {
//           processingMessage: 'Processing stake transaction',
//           errorMessage: 'An error has occurred',
//           successMessage: 'Stake transaction successful'
//         }
//       });

//       alert('Staking transaction sent and is being processed.');
//       fetchStakingInfo();
//     } catch (error) {
//       console.error('Error sending staking tx', error);
//       alert('Transaction failed');
//     }
//   };

//   return (
//     <>
//       {/* Sidebar Button */}
//       <div
//         className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
//         onClick={openModal}
//       >
//         <span className='w-5 text-center opacity-80'>💰</span>
//         <span>Stake</span>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
//           <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-6xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
//             <button
//               onClick={closeModal}
//               className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
//             >
//               ×
//             </button>

//             <h1 className='text-white text-4xl font-light mb-12 text-center'>
//               Staking Dashboard
//             </h1>

//             <div className='flex flex-col md:flex-row gap-8'>
//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-4 text-center'>
//                   My Stake
//                 </div>
//                 <div className='text-white text-3xl font-light'>
//                   {stakedBalance.toFixed(4)} xEGLD
//                 </div>
//               </div>

//               <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-black text-lg mb-4 text-center font-medium'>
//                   My Claimable Rewards
//                 </div>
//                 <div className='text-black text-3xl font-light'>
//                   {claimableRewards.toFixed(4)} xEGLD
//                 </div>
//               </div>

//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-6 text-center'>
//                   Next Rewards Batch In
//                 </div>

//                 <div className='flex items-center gap-6 mb-8'>
//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.hours)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>hours</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.minutes)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>minutes</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.seconds)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>seconds</div>
//                   </div>
//                 </div>

//                 <input
//                   type='number'
//                   min='0'
//                   step='0.01'
//                   value={stakeAmount}
//                   onChange={(e) => setStakeAmount(e.target.value)}
//                   placeholder='Amount to stake'
//                   className='mb-4 w-full px-4 py-3 rounded-lg text-black'
//                 />

//                 <button
//                   onClick={stakeNow}
//                   className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200'
//                 >
//                   Stake Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StakingDashboard;

// import { useState, useEffect } from 'react';
// import { Address, Transaction } from '@multiversx/sdk-core/out';

// import { TransactionManager } from '@multiversx/sdk-dapp/out/managers/TransactionManager';
// import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider';
// import { useGetAccount } from '@multiversx/sdk-dapp/out/react/account/useGetAccount';
// import { useGetNetworkConfig } from '@multiversx/sdk-dapp/out/react/network/useGetNetworkConfig';
// import { refreshAccount } from '@multiversx/sdk-dapp/out/utils/account/refreshAccount';
// import BigNumber from 'bignumber.js';

// const StakingDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 3,
//     minutes: 30,
//     seconds: 16
//   });
//   const [stakedBalance, setStakedBalance] = useState<BigNumber>(
//     new BigNumber(0)
//   );
//   const [claimableRewards, setClaimableRewards] = useState<BigNumber>(
//     new BigNumber(0)
//   );
//   const [stakeAmount, setStakeAmount] = useState<string>('');

//   // Correctly use the imported hooks
//   const account = useGetAccount();

//   // const nonce = account.nonce;
//   const { network } = useGetNetworkConfig();
//   const address = account.address;

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   useEffect(() => {
//     if (!isModalOpen) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { hours, minutes, seconds } = prev;
//         if (seconds > 0) seconds--;
//         else if (minutes > 0) {
//           seconds = 59;
//           minutes--;
//         } else if (hours > 0) {
//           seconds = 59;
//           minutes = 59;
//           hours--;
//         }
//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     fetchStakingInfo();

//     return () => clearInterval(timer);
//   }, [isModalOpen, address]);

//   const formatTime = (time: number) => time.toString().padStart(2, '0');

//   const CONTRACT_ADDRESS = 'staking.contract.address'; // Replace with your actual contract address

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const sdkQueryViewFunction = async (funcName: string, _args: any[]) => {
//     if (!address) return '0';
//     if (funcName === 'getStakingPosition') return '1000000000000000000';
//     if (funcName === 'getClaimableRewards') return '500000000000000000';
//     return '0';
//   };

//   const fetchStakingInfo = async () => {
//     if (!address) return;
//     try {
//       const staked = await sdkQueryViewFunction('getStakingPosition', [
//         address
//       ]);
//       setStakedBalance(new BigNumber(staked).dividedBy(1e18));

//       const rewards = await sdkQueryViewFunction('getClaimableRewards', [
//         address
//       ]);
//       setClaimableRewards(new BigNumber(rewards).dividedBy(1e18));
//     } catch (error) {
//       console.error('Error fetching staking info', error);
//     }
//   };

//   const stakeNow = async () => {
//     if (!address) return alert('Please connect your wallet');
//     if (!stakeAmount || Number(stakeAmount) <= 0)
//       return alert('Enter valid stake amount');

//     await refreshAccount(); // Refresh account to get the latest nonce

//     const provider = getAccountProvider();

//     try {
//       const value = new BigNumber(stakeAmount).multipliedBy(1e18).toFixed(0);
//       const data = new TextEncoder().encode('stake');

//       const transaction = new Transaction({
//         value: BigInt(value),
//         data,
//         sender: new Address(address),
//         receiver: new Address(CONTRACT_ADDRESS),
//         gasLimit: BigInt(60000000), // Standard gas limit for staking
//         chainID: network.chainId,
//         nonce: BigInt(account.nonce)
//       });

//       const signedTransaction = await provider.signTransactions([transaction]);

//       const txManager = TransactionManager.getInstance();
//       const sentTransactions = await txManager.send([signedTransaction]);

//       await txManager.track(sentTransactions, {
//         transactionsDisplayInfo: {
//           processingMessage: 'Processing stake transaction',
//           errorMessage: 'An error has occurred',
//           successMessage: 'Stake transaction successful'
//         }
//       });

//       alert('Staking transaction sent and is being processed.');
//       fetchStakingInfo();
//     } catch (error) {
//       console.error('Error sending staking tx', error);
//       alert('Transaction failed');
//     }
//   };

//   return (
//     <>
//       {/* Sidebar Button */}
//       <div
//         className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
//         onClick={openModal}
//       >
//         <span className='w-5 text-center opacity-80'>💰</span>
//         <span>Stake</span>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
//           <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-6xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
//             <button
//               onClick={closeModal}
//               className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
//             >
//               ×
//             </button>

//             <h1 className='text-white text-4xl font-light mb-12 text-center'>
//               Staking Dashboard
//             </h1>

//             <div className='flex flex-col md:flex-row gap-8'>
//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-4 text-center'>
//                   My Stake
//                 </div>
//                 <div className='text-white text-3xl font-light'>
//                   {stakedBalance.toFixed(4)} xEGLD
//                 </div>
//               </div>

//               <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-black text-lg mb-4 text-center font-medium'>
//                   My Claimable Rewards
//                 </div>
//                 <div className='text-black text-3xl font-light'>
//                   {claimableRewards.toFixed(4)} xEGLD
//                 </div>
//               </div>

//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-6 text-center'>
//                   Next Rewards Batch In
//                 </div>

//                 <div className='flex items-center gap-6 mb-8'>
//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.hours)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>hours</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.minutes)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>minutes</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.seconds)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>seconds</div>
//                   </div>
//                 </div>

//                 <input
//                   type='number'
//                   min='0'
//                   step='0.01'
//                   value={stakeAmount}
//                   onChange={(e) => setStakeAmount(e.target.value)}
//                   placeholder='Amount to stake'
//                   className='mb-4 w-full px-4 py-3 rounded-lg text-black'
//                 />

//                 <button
//                   onClick={stakeNow}
//                   className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200'
//                 >
//                   Stake Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StakingDashboard;

// import { useState, useEffect } from 'react';

// const StakingDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 3,
//     minutes: 30,
//     seconds: 16
//   });

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   useEffect(() => {
//     if (!isModalOpen) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         let { hours, minutes, seconds } = prevTime;

//         if (seconds > 0) {
//           seconds -= 1;
//         } else if (minutes > 0) {
//           seconds = 59;
//           minutes -= 1;
//         } else if (hours > 0) {
//           seconds = 59;
//           minutes = 59;
//           hours -= 1;
//         }

//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isModalOpen]);

//   const formatTime = (time: number) => time.toString().padStart(2, '0');

//   return (
//     <>
//       {/* Sidebar Button */}
//       <div
//         className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
//         onClick={openModal}
//       >
//         <span className='w-5 text-center opacity-80'>💰</span>
//         <span>Stake</span>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
//           <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-6xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
//             >
//               ×
//             </button>

//             {/* Header */}
//             <h1 className='text-white text-4xl font-light mb-12 text-center'>
//               Staking Dashboard
//             </h1>

//             {/* Cards Container */}
//             <div className='flex flex-col md:flex-row gap-8'>
//               {/* My Stake Card */}
//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-4 text-center'>
//                   My Stake
//                 </div>
//                 <div className='text-white text-3xl font-light'>0 xEGLD</div>
//               </div>

//               {/* My Claimable Rewards Card */}
//               <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-black text-lg mb-4 text-center font-medium'>
//                   My Claimable Rewards
//                 </div>
//                 <div className='text-black text-3xl font-light'>0 xEGLD</div>
//               </div>

//               {/* Next Rewards Batch Card */}
//               <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//                 <div className='text-gray-400 text-lg mb-6 text-center'>
//                   Next Rewards Batch In
//                 </div>

//                 {/* Countdown Timer */}
//                 <div className='flex items-center gap-6 mb-8'>
//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.hours)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>hours</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.minutes)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>minutes</div>
//                   </div>

//                   <div className='text-cyan-400 text-3xl font-light'>:</div>

//                   <div className='text-center'>
//                     <div className='text-cyan-400 text-4xl font-light'>
//                       {formatTime(timeLeft.seconds)}
//                     </div>
//                     <div className='text-gray-400 text-sm mt-1'>seconds</div>
//                   </div>
//                 </div>

//                 {/* Stake Now Button */}
//                 <button className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200'>
//                   Stake Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StakingDashboard;

// import { useState, useEffect } from 'react';

// const StakingDashboard = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 3,
//     minutes: 30,
//     seconds: 16
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         let { hours, minutes, seconds } = prevTime;

//         if (seconds > 0) {
//           seconds -= 1;
//         } else if (minutes > 0) {
//           seconds = 59;
//           minutes -= 1;
//         } else if (hours > 0) {
//           seconds = 59;
//           minutes = 59;
//           hours -= 1;
//         }

//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (time: number) => time.toString().padStart(2, '0');

//   return (
//     <div className='bg-black min-h-screen p-8'>
//       {/* Header */}
//       <h1 className='text-white text-4xl font-light mb-12'>
//         Staking Dashboard
//       </h1>

//       {/* Cards Container */}
//       <div className='flex gap-8 max-w-7xl'>
//         {/* My Stake Card */}
//         <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//           <div className='text-gray-400 text-lg mb-4 text-center'>My Stake</div>
//           <div className='text-white text-3xl font-light'>0 xEGLD</div>
//         </div>

//         {/* My Claimable Rewards Card */}
//         <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//           <div className='text-black text-lg mb-4 text-center font-medium'>
//             My Claimable Rewards
//           </div>
//           <div className='text-black text-3xl font-light'>0 xEGLD</div>
//         </div>

//         {/* Next Rewards Batch Card */}
//         <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
//           <div className='text-gray-400 text-lg mb-6 text-center'>
//             Next Rewards Batch In
//           </div>

//           {/* Countdown Timer */}
//           <div className='flex items-center gap-6 mb-8'>
//             <div className='text-center'>
//               <div className='text-cyan-400 text-4xl font-light'>
//                 {formatTime(timeLeft.hours)}
//               </div>
//               <div className='text-gray-400 text-sm mt-1'>hours</div>
//             </div>

//             <div className='text-cyan-400 text-3xl font-light'>:</div>

//             <div className='text-center'>
//               <div className='text-cyan-400 text-4xl font-light'>
//                 {formatTime(timeLeft.minutes)}
//               </div>
//               <div className='text-gray-400 text-sm mt-1'>minutes</div>
//             </div>

//             <div className='text-cyan-400 text-3xl font-light'>:</div>

//             <div className='text-center'>
//               <div className='text-cyan-400 text-4xl font-light'>
//                 {formatTime(timeLeft.seconds)}
//               </div>
//               <div className='text-gray-400 text-sm mt-1'>seconds</div>
//             </div>
//           </div>

//           {/* Stake Now Button */}
//           <button className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200'>
//             Stake Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StakingDashboard;
