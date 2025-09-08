import { useState } from 'react';

const SignMessageComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSign = () => {
    if (message.trim()) {
      // Handle signing logic here
      console.log('Signing message:', message);
      setCurrentStep(2);
    }
  };

  return (
    <>
      {/* Sign Message Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>✍️</span>
        <span>Sign Message</span>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-lg mx-4 relative border border-gray-700'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>

            {/* Step Indicators */}
            <div className='flex items-center justify-center gap-8 mb-8'>
              {/* Step 1 */}
              <div className='flex items-center gap-3'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === 1
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  1
                </div>
                <span
                  className={`text-sm ${
                    currentStep === 1 ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  Input Message
                </span>
              </div>

              {/* Divider Line */}
              <div className='h-px bg-gray-700 w-16'></div>

              {/* Step 2 */}
              <div className='flex items-center gap-3'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === 2
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-sm ${
                    currentStep === 2 ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  View Signature
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className='text-2xl font-medium text-white text-center mb-6'>
              Message Signing
            </h2>

            {/* Description */}
            <p className='text-gray-400 text-center mb-8 text-sm'>
              Type in the message that you would like to sign
              <br />
              ...or <span className='text-cyan-400'>verify a signature 🔗</span>
            </p>

            {/* Message Input */}
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm mb-3'>
                Message to sign
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full h-32 bg-transparent border-2 border-red-500 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-red-400 placeholder-gray-500'
                placeholder='Enter your message here...'
              />
              <p className='text-red-500 text-xs mt-2'>Required</p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col gap-4'>
              <button
                onClick={handleSign}
                disabled={!message.trim()}
                className='bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-colors w-full'
              >
                Sign
              </button>
              <button
                onClick={closeModal}
                className='text-gray-400 hover:text-white transition-colors text-center'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignMessageComponent;
