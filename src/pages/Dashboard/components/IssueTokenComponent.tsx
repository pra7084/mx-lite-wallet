import { useState } from 'react';

const IssueTokenComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (
    toggleName:
      | 'freezable'
      | 'wipeable'
      | 'pauseable'
      | 'upgradeable'
      | 'changeableOwner'
      | 'canAddSpecialRoles'
  ) => {
    setToggles((prev) => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  const handleContinue = () => {
    // Handle continue logic here
    console.log('Form Data:', formData);
    console.log('Toggles:', toggles);
  };

  return (
    <>
      {/* Issue Token Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🪙</span>
        <span>Issue Token</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl w-full max-w-lg mx-4 p-8 relative border border-gray-700'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors'
            >
              ×
            </button>

            {/* Title */}
            <h2 className='text-white text-2xl font-medium text-center mb-8'>
              Issue Token
            </h2>

            {/* Name Input */}
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm mb-2'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                placeholder=''
              />
            </div>

            {/* Ticker Input */}
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm mb-2'>Ticker</label>
              <input
                type='text'
                name='ticker'
                value={formData.ticker}
                onChange={handleInputChange}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                placeholder=''
              />
            </div>

            {/* Mint Amount Input */}
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm mb-2'>
                Mint Amount
              </label>
              <input
                type='text'
                name='mintAmount'
                value={formData.mintAmount}
                onChange={handleInputChange}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors'
                placeholder=''
              />
            </div>

            {/* Decimals Input */}
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
                placeholder=''
              />
            </div>

            {/* Toggle Options */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-6 mb-8'>
              {/* Left Column */}
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
                        toggles.freezable ? 'translate-x-6' : 'translate-x-0.5'
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
                        toggles.pauseable ? 'translate-x-6' : 'translate-x-0.5'
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
                      toggles.changeableOwner ? 'bg-cyan-400' : 'bg-gray-600'
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

              {/* Right Column */}
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
                        toggles.wipeable ? 'translate-x-6' : 'translate-x-0.5'
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
                      toggles.canAddSpecialRoles ? 'bg-cyan-400' : 'bg-gray-600'
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

export default IssueTokenComponent;
