import { useState } from 'react';
import {
  ApiNetworkProvider,
  Transaction,
  Address,
  UserSigner,
  UserSecretKey,
  TransactionComputer // Import TransactionComputer
} from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';

const IssueTokenComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    mintAmount: '',
    decimals: '18'
  });
  const [toggles, setToggles] = useState({
    freezable: false,
    wipeable: false,
    pauseable: false,
    upgradeable: true,
    changeableOwner: false,
    canAddSpecialRoles: true
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionHash('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  type ToggleName = keyof typeof toggles;

  const handleToggle = (toggleName: ToggleName) => {
    setToggles((prev) => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  const handleContinue = async () => {
    try {
      const provider = new ApiNetworkProvider(
        'https://devnet-api.multiversx.com'
      );

      const secretKeyHex =
        '413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9';
      const secretKey = UserSecretKey.fromString(secretKeyHex);
      const signer = new UserSigner(secretKey);
      const userAddress = signer.getAddress();

      const account = await provider.getAccount(userAddress);
      // Ensure the latest network config is used for the transaction
      await provider.getNetworkConfig();
      const nonce = account.nonce.valueOf();

      const initialSupply = new BigNumber(formData.mintAmount).shiftedBy(
        parseInt(formData.decimals, 10)
      );

      const toEvenHex = (str: string) =>
        str.length % 2 !== 0 ? '0' + str : str;

      const initialSupplyHex = toEvenHex(initialSupply.toString(16));
      const decimalsHex = toEvenHex(
        parseInt(formData.decimals, 10).toString(16)
      );

      const dataParts = [
        'issue',
        Buffer.from(formData.name).toString('hex'),
        Buffer.from(formData.ticker.toUpperCase()).toString('hex'),
        initialSupplyHex,
        decimalsHex,
        'canFreeze',
        Buffer.from(toggles.freezable.toString()).toString('hex'),
        'canWipe',
        Buffer.from(toggles.wipeable.toString()).toString('hex'),
        'canPause',
        Buffer.from(toggles.pauseable.toString()).toString('hex'),
        'canChangeOwner',
        Buffer.from(toggles.changeableOwner.toString()).toString('hex'),
        'canUpgrade',
        Buffer.from(toggles.upgradeable.toString()).toString('hex'),
        'canAddSpecialRoles',
        Buffer.from(toggles.canAddSpecialRoles.toString()).toString('hex')
      ];

      const dataString = dataParts.join('@');
      const data = new TextEncoder().encode(dataString);

      const tx = new Transaction({
        sender: userAddress,
        receiver: new Address(
          'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u'
        ),
        value: BigInt('50000000000000000'),
        gasLimit: BigInt('60000000'),
        data: data,
        chainID: 'D',
        nonce: nonce,
        version: 1
      });

      // --- CORRECT SIGNING PROCESS ---
      // 1. Serialize the transaction
      const computer = new TransactionComputer();
      const serializedTx = computer.computeBytesForSigning(tx);

      // 2. Sign the serialized transaction bytes
      const signature = await signer.sign(serializedTx);

      // 3. Apply the signature to the transaction object
      tx.applySignature(signature);
      // --- END OF CORRECTION ---

      // 4. Send the fully signed transaction
      const txHash = await provider.sendTransaction(tx);

      console.log('Transaction hash:', txHash);
      setTransactionHash(txHash);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error('Token issuance failed:', error);
    }
  };

  return (
    <>
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🪙</span>
        <span>Issue Token</span>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl w-full max-w-lg mx-4 p-8 relative border border-gray-700'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors'
            >
              ×
            </button>

            <h2 className='text-white text-2xl font-medium text-center mb-8'>
              Issue Token
            </h2>

            {transactionHash ? (
              <div className='text-center'>
                <h3 className='text-green-400 text-xl mb-4'>
                  Transaction Sent!
                </h3>
                <p className='text-gray-300 mb-2'>Transaction Hash:</p>
                <a
                  href={`https://devnet-explorer.multiversx.com/transactions/${transactionHash}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-cyan-400 break-all hover:underline'
                >
                  {transactionHash}
                </a>
              </div>
            ) : errorMessage ? (
              <div className='text-center text-red-400'>{errorMessage}</div>
            ) : (
              <>
                {/* Form fields and toggles */}
                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., MyToken'
                  />
                </div>

                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-2'>
                    Ticker
                  </label>
                  <input
                    type='text'
                    name='ticker'
                    value={formData.ticker}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., MTK'
                  />
                </div>

                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-2'>
                    Initial Supply
                  </label>
                  <input
                    type='text'
                    name='mintAmount'
                    value={formData.mintAmount}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., 1000000'
                  />
                </div>

                <div className='mb-8'>
                  <label className='block text-gray-300 text-sm mb-2'>
                    Decimals
                  </label>
                  <input
                    type='text'
                    name='decimals'
                    value={formData.decimals}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., 18'
                  />
                </div>

                <div className='grid grid-cols-2 gap-x-8 gap-y-6 mb-8'>
                  <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Freezable</span>
                      <button
                        onClick={() => handleToggle('freezable')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.freezable ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.freezable
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Pauseable</span>
                      <button
                        onClick={() => handleToggle('pauseable')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.pauseable ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.pauseable
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>
                        Changeable Owner
                      </span>
                      <button
                        onClick={() => handleToggle('changeableOwner')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.changeableOwner
                            ? 'bg-cyan-400'
                            : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.changeableOwner
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Wipeable</span>
                      <button
                        onClick={() => handleToggle('wipeable')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.wipeable ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.wipeable
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Upgradeable</span>
                      <button
                        onClick={() => handleToggle('upgradeable')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.upgradeable ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.upgradeable
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>
                        Can Add Special Roles
                      </span>
                      <button
                        onClick={() => handleToggle('canAddSpecialRoles')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.canAddSpecialRoles
                            ? 'bg-cyan-400'
                            : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.canAddSpecialRoles
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className='w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-lg transition-colors'
                >
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IssueTokenComponent;
