import { useState } from 'react';
import {
  UserSigner,
  UserVerifier,
  UserSecretKey
} from '@multiversx/sdk-wallet'; // UserSigner and UserVerifier are often in sdk-wallet

const SignMessageComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // In a real application, the secret key would be securely managed,
  // for example, by a wallet provider.
  const secretKeyHex =
    '413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9';
  const secretKey = new UserSecretKey(
    Uint8Array.from(Buffer.from(secretKeyHex, 'hex'))
  );
  const signer = new UserSigner(secretKey);
  const publicKey = secretKey.generatePublicKey();
  const verifier = new UserVerifier(publicKey);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setMessage('');
    setSignature('');
    setIsVerified(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSign = async () => {
    if (message.trim()) {
      const messageBuffer = Buffer.from(message);
      const signatureBuffer = await signer.sign(messageBuffer);
      const signatureHex = signatureBuffer.toString('hex');

      setSignature(signatureHex);
      setCurrentStep(2);
    }
  };

  const handleVerify = async () => {
    const messageBuffer = Buffer.from(message);
    const signatureToVerify = Buffer.from(signature, 'hex');

    const isSignatureValid = await verifier.verify(
      messageBuffer,
      signatureToVerify
    );
    setIsVerified(isSignatureValid);
  };

  const handleGoBack = () => {
    setCurrentStep(1);
    setMessage('');
    setSignature('');
    setIsVerified(null);
  };

  return (
    <>
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>✍️</span>
        <span>Sign Message</span>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-lg mx-4 relative border border-gray-700'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>

            <div className='flex items-center justify-center gap-8 mb-8'>
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
              <div className='h-px bg-gray-700 w-16'></div>
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
                  View & Verify
                </span>
              </div>
            </div>

            <h2 className='text-2xl font-medium text-white text-center mb-6'>
              Message Signing
            </h2>

            {currentStep === 1 && (
              <>
                <p className='text-gray-400 text-center mb-8 text-sm'>
                  Type in the message that you would like to sign.
                </p>
                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-3'>
                    Message to sign
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full h-32 bg-transparent border-2 border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-cyan-400 placeholder-gray-500'
                    placeholder='Enter your message here...'
                  />
                  {!message.trim() && (
                    <p className='text-red-500 text-xs mt-2'>Required</p>
                  )}
                </div>
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
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-3'>
                    Original Message
                  </label>
                  <p className='w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300'>
                    {message}
                  </p>
                </div>

                <div className='mb-6'>
                  <label className='block text-gray-300 text-sm mb-3'>
                    Signature
                  </label>
                  <textarea
                    value={signature}
                    readOnly
                    className='w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-4 text-cyan-400 resize-none'
                  />
                </div>
                {isVerified !== null && (
                  <div
                    className={`mb-6 p-4 rounded-lg text-sm ${
                      isVerified
                        ? 'bg-green-900 border-green-700 text-green-300'
                        : 'bg-red-900 border-red-700 text-red-300'
                    }`}
                  >
                    {isVerified
                      ? '✅ Signature is valid.'
                      : '❌ Signature is invalid.'}
                  </div>
                )}
                <div className='flex flex-col gap-4'>
                  <button
                    onClick={handleVerify}
                    className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors w-full'
                  >
                    Verify Signature
                  </button>
                  <button
                    onClick={handleGoBack}
                    className='text-gray-400 hover:text-white transition-colors text-center'
                  >
                    Sign another message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignMessageComponent;
