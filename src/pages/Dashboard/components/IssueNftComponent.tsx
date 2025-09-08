import { useState } from 'react';

const IssueNFTComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collection, setCollection] = useState('');
  const [selectedType, setSelectedType] = useState('nft');
  const [toggles, setToggles] = useState({
    freezable: false,
    wipeable: false,
    pauseable: false,
    transferableCreateRole: false
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  interface Toggles {
    freezable: boolean;
    wipeable: boolean;
    pauseable: boolean;
    transferableCreateRole: boolean;
  }

  type ToggleName = keyof Toggles;

  const handleToggle = (toggleName: ToggleName) => {
    setToggles((prev: Toggles) => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  const handleContinue = () => {
    // Handle continue logic here
    console.log({
      collectionName,
      collection,
      selectedType,
      toggles
    });
  };

  return (
    <>
      {/* Issue NFT Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🖼️</span>
        <span>Issue NFT</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl w-full max-w-2xl mx-4 p-8 relative border border-gray-700'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors'
            >
              ×
            </button>

            {/* Title */}
            <h2 className='text-white text-2xl font-medium text-center mb-8'>
              Issue Collection
            </h2>

            {/* Collection Name Input */}
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm mb-3'>
                Collection Name
              </label>
              <input
                type='text'
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                placeholder=''
              />
            </div>

            {/* Collection Input */}
            <div className='mb-8'>
              <label className='block text-gray-300 text-sm mb-3'>
                Collection
              </label>
              <input
                type='text'
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                placeholder=''
              />
            </div>

            {/* Type Selection Buttons */}
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
                    selectedType === 'nft' ? 'border-white' : 'border-gray-400'
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
                    selectedType === 'sft' ? 'border-white' : 'border-gray-400'
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
                    selectedType === 'meta' ? 'border-white' : 'border-gray-400'
                  }`}
                >
                  {selectedType === 'meta' && (
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  )}
                </div>
                Meta ESDT
              </button>
            </div>

            {/* Toggle Options */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 mb-8'>
              {/* Left Column */}
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-cyan-400 text-sm'>Freezable</span>
                  <button
                    onClick={() => handleToggle('freezable')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      toggles.freezable ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        toggles.freezable ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-cyan-400 text-sm'>Pauseable</span>
                  <button
                    onClick={() => handleToggle('pauseable')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      toggles.pauseable ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        toggles.pauseable ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-cyan-400 text-sm'>Wipeable</span>
                  <button
                    onClick={() => handleToggle('wipeable')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      toggles.wipeable ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        toggles.wipeable ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-cyan-400 text-sm'>
                    Transferable Create Role
                  </span>
                  <button
                    onClick={() => handleToggle('transferableCreateRole')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      toggles.transferableCreateRole
                        ? 'bg-cyan-400'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        toggles.transferableCreateRole
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className='w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-lg transition-colors'
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueNFTComponent;
