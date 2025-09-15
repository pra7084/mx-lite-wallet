import { Buffer } from 'buffer';
import { useState } from 'react';
import {
  ApiNetworkProvider,
  Transaction,
  Address,
  UserSigner,
  UserSecretKey,
  TransactionComputer
} from '@multiversx/sdk-core';

const IssueNFTComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionTicker, setCollectionTicker] = useState(''); // Changed from 'collection' to 'collectionTicker' for clarity
  const [selectedType, setSelectedType] = useState('nft');
  const [toggles, setToggles] = useState({
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canTransferNFTCreateRole: false // Updated to match on-chain property name
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionHash('');
    setErrorMessage('');
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
      await provider.getNetworkConfig();
      const nonce = account.nonce.valueOf();

      const issueFunctionName =
        selectedType === 'nft'
          ? 'issueNonFungible'
          : selectedType === 'sft'
          ? 'issueSemiFungible'
          : 'issueMetaESDT';

      const dataParts = [
        issueFunctionName,
        Buffer.from(collectionName).toString('hex'),
        Buffer.from(collectionTicker.toUpperCase()).toString('hex'),
        ...Object.entries(toggles)
          .map(([key, value]) => [
            key,
            Buffer.from(value.toString()).toString('hex')
          ])
          .flat()
      ];

      const dataString = dataParts.join('@');
      const data = new TextEncoder().encode(dataString);

      const tx = new Transaction({
        sender: userAddress,
        receiver: new Address(
          'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u'
        ),
        value: BigInt('50000000000000000'), // 0.05 EGLD for issuance cost
        gasLimit: BigInt('60000000'),
        data: data,
        chainID: 'D',
        nonce: nonce,
        version: 1
      });

      const computer = new TransactionComputer();
      const serializedTx = computer.computeBytesForSigning(tx);
      const signature = await signer.sign(serializedTx);
      tx.applySignature(signature);

      const sentTxHash = await provider.sendTransaction(tx);

      setTransactionHash(sentTxHash);
      console.log('Transaction hash:', sentTxHash);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error('NFT collection issuance failed:', error);
    }
  };

  return (
    <>
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🖼️</span>
        <span>Issue NFT</span>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl w-full max-w-2xl mx-4 p-8 relative border border-gray-700'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors'
            >
              ×
            </button>

            <h2 className='text-white text-2xl font-medium text-center mb-8'>
              Issue Collection
            </h2>

            {transactionHash ? (
              <div className='text-center'>
                <h3 className='text-green-400 text-xl mb-4'>
                  Collection Issue Transaction Sent!
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
              <div className='text-center text-red-400 p-4 bg-red-900/50 rounded-lg'>
                {errorMessage}
              </div>
            ) : (
              <>
                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-3'>
                    Collection Name
                  </label>
                  <input
                    type='text'
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., My Awesome Collection'
                  />
                </div>

                <div className='mb-8'>
                  <label className='block text-gray-300 text-sm mb-3'>
                    Collection Ticker
                  </label>
                  <input
                    type='text'
                    value={collectionTicker}
                    onChange={(e) => setCollectionTicker(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                    placeholder='e.g., MYAC'
                  />
                </div>

                <div className='flex gap-2 mb-8'>
                  <button
                    onClick={() => setSelectedType('nft')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedType === 'nft'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedType === 'nft'
                          ? 'border-white'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedType === 'nft' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    Fixed Quantity (NFT)
                  </button>

                  <button
                    onClick={() => setSelectedType('sft')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedType === 'sft'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedType === 'sft'
                          ? 'border-white'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedType === 'sft' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    Variable Quantity (SFT)
                  </button>

                  <button
                    onClick={() => setSelectedType('meta')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedType === 'meta'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedType === 'meta'
                          ? 'border-white'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedType === 'meta' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    Meta ESDT
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-x-8 gap-y-4 mb-8'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Freezable</span>
                      <button
                        onClick={() => handleToggle('canFreeze')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.canFreeze ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.canFreeze
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></span>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Pauseable</span>
                      <button
                        onClick={() => handleToggle('canPause')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.canPause ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.canPause
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></span>
                      </button>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>Wipeable</span>
                      <button
                        onClick={() => handleToggle('canWipe')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.canWipe ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.canWipe
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></span>
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-cyan-400 text-sm'>
                        Transferable Create Role
                      </span>
                      <button
                        onClick={() => handleToggle('canTransferNFTCreateRole')}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          toggles.canTransferNFTCreateRole
                            ? 'bg-cyan-400'
                            : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                            toggles.canTransferNFTCreateRole
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></span>
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

export default IssueNFTComponent;
