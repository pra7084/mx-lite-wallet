import { useState } from 'react';

const GuardianSetup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(true);
  const [otherOptionsOpen, setOtherOptionsOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Sidebar Trigger Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🛡️</span>
        <span>Guardian Setup</span>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-5xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>

            {/* Account Status Header */}
            <div className='bg-zinc-800 px-8 py-4 mb-6 rounded-lg'>
              <div className='flex items-center gap-3 text-sm text-gray-300'>
                <span className='text-red-400 text-lg'>⚠</span>
                <span>
                  Your account status:{' '}
                  <span className='text-gray-400'>not guarded</span>
                </span>
              </div>
            </div>

            {/* Main Guardian Section */}
            <div className='bg-zinc-900 px-8 py-12 mb-8 rounded-lg'>
              <h1 className='text-5xl font-light leading-tight mb-8 text-white'>
                Secure your wallet and funds
                <br />
                with a 2-factor authentication guardian.
              </h1>
              <div className='flex items-start gap-4 bg-zinc-800 px-6 py-5 rounded-xl mb-6'>
                <span className='text-blue-400 text-xl mt-0.5'>ⓘ</span>
                <span className='text-gray-300 text-base leading-relaxed'>
                  You need a balance of at least{' '}
                  <span className='font-mono'>0.000000000001 xEGLD</span> in
                  account to add a guardian.
                </span>
              </div>
              <button className='bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20'>
                Buy xEGLD
              </button>
            </div>

            {/* How It Works Section */}
            <div className='bg-zinc-900 border-t border-zinc-700 mb-8 rounded-lg'>
              <div
                className='flex justify-between items-center px-8 py-8 cursor-pointer hover:bg-zinc-800/30 transition-colors'
                onClick={() => setHowItWorksOpen(!howItWorksOpen)}
              >
                <h2 className='text-4xl font-light text-white'>How it works</h2>
                <span
                  className={`text-2xl text-gray-400 transition-transform duration-300 ${
                    howItWorksOpen ? 'rotate-90' : ''
                  }`}
                >
                  ❯
                </span>
              </div>
              {howItWorksOpen && (
                <div className='px-8 pb-8'>
                  <div className='grid grid-cols-3 gap-6 mb-12'>
                    {/* Card 1 */}
                    <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
                      <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
                        <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
                          <div className='text-cyan-400 text-4xl'>🔒</div>
                        </div>
                      </div>
                      <p className='text-gray-300 text-base leading-relaxed'>
                        Guardian enables 2-factor authentication on your wallet.
                      </p>
                    </div>
                    {/* Card 2 */}
                    <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
                      <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
                        <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
                          <div className='text-cyan-400 text-4xl'>🤝</div>
                        </div>
                      </div>
                      <p className='text-gray-300 text-base leading-relaxed'>
                        Linking a Guardian to your wallet.
                      </p>
                    </div>
                    {/* Card 3 */}
                    <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
                      <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
                        <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
                          <div className='text-cyan-400 text-4xl'>🛡️</div>
                        </div>
                      </div>
                      <p className='text-gray-300 text-base leading-relaxed'>
                        To prevent loss of funds if your seed phrase is
                        compromised.
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-5 gap-12'>
                    {/* Video Section */}
                    <div className='col-span-3'>
                      <h3 className='text-xl font-medium mb-6 text-white'>
                        Watch a short video guide on how to use a Guardian
                      </h3>
                      <div className='relative bg-black rounded-xl overflow-hidden aspect-video border border-zinc-800'>
                        <div className='absolute inset-0 bg-gradient-to-br from-black via-zinc-900/50 to-black flex flex-col items-center justify-center'>
                          <div className='absolute top-6 left-6 flex items-center gap-3'>
                            <div className='text-cyan-400 text-2xl'>✕</div>
                            <span className='text-white text-lg'>
                              MultiversX WebWallet - Guardian Setup Walkthrough
                            </span>
                            <div className='absolute top-0 right-6 flex items-center gap-4'>
                              <span className='text-gray-400 text-sm'>
                                Share
                              </span>
                              <span className='text-gray-400 text-lg'>↗</span>
                            </div>
                          </div>
                          <div className='w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-red-700 transition-colors mb-8'>
                            ▶
                          </div>
                          <div className='text-center mb-8'>
                            <div className='text-6xl font-bold text-white leading-tight'>
                              Web Wallet
                              <br />
                              Guardian Setup
                            </div>
                          </div>
                          <div className='absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 px-4 py-2 rounded'>
                            <div className='text-white text-sm'>Watch on</div>
                            <div className='text-red-600 font-bold text-sm'>
                              YouTube
                            </div>
                          </div>
                          <div className='absolute bottom-6 right-6 text-gray-400 text-sm'>
                            wallet.multiversx.com
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className='col-span-2'>
                      <h3 className='text-xl font-medium mb-6 text-white'>
                        Got any questions? Get answers from our Help Center
                      </h3>
                      <div className='space-y-4 mb-8'>
                        {[
                          'How does the guardian work?',
                          'Why does it take 20 days to change a guardian?',
                          'What do I have to do if my account is compromised?',
                          'What happens if I lose access to my authenticator?',
                          'How can I use an xPortal account on the Web Wallet if it has the invisible guardian enabled?'
                        ].map((q, i) => (
                          <a
                            key={i}
                            href='#'
                            className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
                          >
                            <span className='text-gray-400 mt-1'>📄</span>
                            <span className='group-hover:underline leading-relaxed'>
                              {q}
                            </span>
                          </a>
                        ))}
                      </div>
                      <button className='bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-gray-300 px-6 py-3 rounded-lg transition-colors'>
                        Get more answers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Guardian Options Section */}
            <div className='bg-zinc-900 border-t border-zinc-700 rounded-lg'>
              <div
                className='flex justify-between items-center px-8 py-8 cursor-pointer hover:bg-zinc-800/30 transition-colors'
                onClick={() => setOtherOptionsOpen(!otherOptionsOpen)}
              >
                <h2 className='text-4xl font-light text-white'>
                  Other Guardian Options
                </h2>
                <span
                  className={`text-2xl text-gray-400 transition-transform duration-300 ${
                    otherOptionsOpen ? 'rotate-90' : ''
                  }`}
                >
                  ❯
                </span>
              </div>
              {otherOptionsOpen && (
                <div className='px-8 pb-8'>
                  <div className='grid grid-cols-2 gap-8'>
                    {/* Invisible Guardian */}
                    <div className='bg-black border border-zinc-700 rounded-xl p-8'>
                      <div className='flex flex-col h-full'>
                        <div className='w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-6'>
                          <span className='text-gray-400 text-3xl'>💻</span>
                        </div>
                        <h4 className='text-2xl font-medium text-white mb-4'>
                          Invisible Guardian (only on xPortal)
                        </h4>
                        <p className='text-gray-400 text-base mb-8 flex-grow leading-relaxed'>
                          Linked to your device&apos;s biometrics.
                        </p>
                        <button className='bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20 self-start'>
                          Download xPortal
                        </button>
                      </div>
                    </div>
                    {/* 3rd-party Guardians */}
                    <div className='bg-black border border-zinc-700 rounded-xl p-8'>
                      <div className='flex flex-col h-full'>
                        <div className='w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-6'>
                          <span className='text-gray-400 text-3xl'>👥</span>
                        </div>
                        <h4 className='text-2xl font-medium text-white mb-4'>
                          3rd-party Guardians
                        </h4>
                        <p className='text-gray-400 text-base mb-8 flex-grow leading-relaxed'>
                          Trusted people act as Guardians on your account
                        </p>
                        <button
                          className='bg-transparent border border-zinc-600 text-zinc-500 px-6 py-3 rounded-lg cursor-not-allowed self-start'
                          disabled
                        >
                          Coming soon...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuardianSetup;

// import { useState } from 'react';

// const GuardianSetup = () => {
//   const [howItWorksOpen, setHowItWorksOpen] = useState(true);
//   const [otherOptionsOpen, setOtherOptionsOpen] = useState(true);

//   return (
//     <div className='font-system bg-black text-white min-h-screen'>
//       {/* Account Status Header */}
//       <div className='bg-zinc-800 px-8 py-4'>
//         <div className='flex items-center gap-3 text-sm text-gray-300'>
//           <span className='text-red-400 text-lg'>⚠</span>
//           <span>
//             Your account status:{' '}
//             <span className='text-gray-400'>not guarded</span>
//           </span>
//         </div>
//       </div>

//       {/* Main Guardian Section */}
//       <div className='bg-zinc-900 px-8 py-12'>
//         <h1 className='text-5xl font-light leading-tight mb-8 text-white max-w-4xl'>
//           Secure your wallet and funds
//           <br />
//           with a 2-factor authentication guardian.
//         </h1>

//         <div className='flex items-start gap-4 bg-zinc-800 px-6 py-5 rounded-xl mb-6 max-w-4xl'>
//           <span className='text-blue-400 text-xl mt-0.5'>ⓘ</span>
//           <span className='text-gray-300 text-base leading-relaxed'>
//             You need a balance of at least{' '}
//             <span className='font-mono'>0.000000000001 xEGLD</span> in your
//             account in order to add a guardian.
//           </span>
//         </div>

//         <button className='bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20'>
//           Buy xEGLD
//         </button>
//       </div>

//       {/* How it works section */}
//       <div className='bg-zinc-900 border-t border-zinc-700'>
//         <div
//           className='flex justify-between items-center px-8 py-8 cursor-pointer hover:bg-zinc-800/30 transition-colors'
//           onClick={() => setHowItWorksOpen(!howItWorksOpen)}
//         >
//           <h2 className='text-4xl font-light text-white'>How it works</h2>
//           <span
//             className={`text-2xl text-gray-400 transition-transform duration-300 ${
//               howItWorksOpen ? 'rotate-90' : ''
//             }`}
//           >
//             ❯
//           </span>
//         </div>

//         {howItWorksOpen && (
//           <div className='px-8 pb-8'>
//             {/* Three Cards Section */}
//             <div className='grid grid-cols-3 gap-6 mb-12'>
//               <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
//                 <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
//                   <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
//                     <div className='text-cyan-400 text-4xl'>🔒</div>
//                   </div>
//                 </div>
//                 <p className='text-gray-300 text-base leading-relaxed'>
//                   Guardian enables 2-factor authentication on your wallet.
//                 </p>
//               </div>

//               <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
//                 <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
//                   <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
//                     <div className='text-cyan-400 text-4xl'>🤝</div>
//                   </div>
//                 </div>
//                 <p className='text-gray-300 text-base leading-relaxed'>
//                   Linking a Guardian to your wallet.
//                 </p>
//               </div>

//               <div className='bg-black border border-zinc-700 rounded-xl p-8 text-center'>
//                 <div className='w-full h-32 bg-zinc-900 rounded-lg mb-8 flex items-center justify-center'>
//                   <div className='w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg flex items-center justify-center'>
//                     <div className='text-cyan-400 text-4xl'>🛡️</div>
//                   </div>
//                 </div>
//                 <p className='text-gray-300 text-base leading-relaxed'>
//                   To prevent loss of funds if your seed phrase is compromised.
//                 </p>
//               </div>
//             </div>

//             {/* Video and FAQ Section */}
//             <div className='grid grid-cols-5 gap-12'>
//               {/* Video Section - Takes 3/5 of the width */}
//               <div className='col-span-3'>
//                 <h3 className='text-xl font-medium mb-6 text-white'>
//                   Watch a short video guide on how to use a Guardian
//                 </h3>
//                 <div className='relative bg-black rounded-xl overflow-hidden aspect-video border border-zinc-800'>
//                   <div className='absolute inset-0 bg-gradient-to-br from-black via-zinc-900/50 to-black flex flex-col items-center justify-center'>
//                     {/* MultiversX Logo and Title */}
//                     <div className='absolute top-6 left-6 flex items-center gap-3'>
//                       <div className='text-cyan-400 text-2xl'>✕</div>
//                       <span className='text-white text-lg'>
//                         MultiversX WebWallet - Guardian Setup Walkthrough
//                       </span>
//                       <div className='absolute top-0 right-6 flex items-center gap-4'>
//                         <span className='text-gray-400 text-sm'>Share</span>
//                         <span className='text-gray-400 text-lg'>↗</span>
//                       </div>
//                     </div>

//                     {/* Center Play Button */}
//                     <div className='w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer hover:bg-red-700 transition-colors mb-8'>
//                       ▶
//                     </div>

//                     {/* Large Title */}
//                     <div className='text-center mb-8'>
//                       <div className='text-6xl font-bold text-white leading-tight'>
//                         Web Wallet
//                         <br />
//                         Guardian Setup
//                       </div>
//                     </div>

//                     {/* Bottom Elements */}
//                     <div className='absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 px-4 py-2 rounded'>
//                       <div className='text-white text-sm'>Watch on</div>
//                       <div className='text-red-600 font-bold text-sm'>
//                         YouTube
//                       </div>
//                     </div>
//                     <div className='absolute bottom-6 right-6 text-gray-400 text-sm'>
//                       wallet.multiversx.com
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* FAQ Section - Takes 2/5 of the width */}
//               <div className='col-span-2'>
//                 <h3 className='text-xl font-medium mb-6 text-white'>
//                   Got any questions? Get answers from our Help Center
//                 </h3>
//                 <div className='space-y-4 mb-8'>
//                   <a
//                     href='#'
//                     className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
//                   >
//                     <span className='text-gray-400 mt-1'>📄</span>
//                     <span className='group-hover:underline'>
//                       How does the guardian work?
//                     </span>
//                   </a>
//                   <a
//                     href='#'
//                     className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
//                   >
//                     <span className='text-gray-400 mt-1'>📄</span>
//                     <span className='group-hover:underline'>
//                       Why does it take 20 days to change a guardian?
//                     </span>
//                   </a>
//                   <a
//                     href='#'
//                     className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
//                   >
//                     <span className='text-gray-400 mt-1'>📄</span>
//                     <span className='group-hover:underline'>
//                       What do I have to do if my account is compromised?
//                     </span>
//                   </a>
//                   <a
//                     href='#'
//                     className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
//                   >
//                     <span className='text-gray-400 mt-1'>📄</span>
//                     <span className='group-hover:underline'>
//                       What happens if I lose access to my authenticator?
//                     </span>
//                   </a>
//                   <a
//                     href='#'
//                     className='flex items-start gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group'
//                   >
//                     <span className='text-gray-400 mt-1'>📄</span>
//                     <span className='group-hover:underline leading-relaxed'>
//                       How can I use an xPortal account on the Web Wallet if it
//                       has the invisible guardian enabled?
//                     </span>
//                   </a>
//                 </div>
//                 <button className='bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-gray-300 px-6 py-3 rounded-lg transition-colors'>
//                   Get more answers
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Other Guardian Options */}
//       <div className='bg-zinc-900 border-t border-zinc-700'>
//         <div
//           className='flex justify-between items-center px-8 py-8 cursor-pointer hover:bg-zinc-800/30 transition-colors'
//           onClick={() => setOtherOptionsOpen(!otherOptionsOpen)}
//         >
//           <h2 className='text-4xl font-light text-white'>
//             Other Guardian Options
//           </h2>
//           <span
//             className={`text-2xl text-gray-400 transition-transform duration-300 ${
//               otherOptionsOpen ? 'rotate-90' : ''
//             }`}
//           >
//             ❯
//           </span>
//         </div>

//         {otherOptionsOpen && (
//           <div className='px-8 pb-8'>
//             <div className='grid grid-cols-2 gap-8'>
//               {/* Invisible Guardian Option */}
//               <div className='bg-black border border-zinc-700 rounded-xl p-8'>
//                 <div className='flex flex-col h-full'>
//                   <div className='w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-6'>
//                     <span className='text-gray-400 text-3xl'>💻</span>
//                   </div>
//                   <h4 className='text-2xl font-medium text-white mb-4'>
//                     Invisible Guardian (only on xPortal)
//                   </h4>
//                   <p className='text-gray-400 text-base mb-8 flex-grow leading-relaxed'>
//                     Linked to your device's biometrics.
//                   </p>
//                   <button className='bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/20 self-start'>
//                     Download xPortal
//                   </button>
//                 </div>
//               </div>

//               {/* 3rd-party Guardians Option */}
//               <div className='bg-black border border-zinc-700 rounded-xl p-8'>
//                 <div className='flex flex-col h-full'>
//                   <div className='w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-6'>
//                     <span className='text-gray-400 text-3xl'>👥</span>
//                   </div>
//                   <h4 className='text-2xl font-medium text-white mb-4'>
//                     3rd-party Guardians
//                   </h4>
//                   <p className='text-gray-400 text-base mb-8 flex-grow leading-relaxed'>
//                     Trusted people act as Guardians on your account
//                   </p>
//                   <button
//                     className='bg-transparent border border-zinc-600 text-zinc-500 px-6 py-3 rounded-lg cursor-not-allowed self-start'
//                     disabled
//                   >
//                     Coming soon...
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GuardianSetup;
