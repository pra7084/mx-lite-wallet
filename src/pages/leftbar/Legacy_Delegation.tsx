import { useState, useEffect } from 'react';

const LegacyDelegationDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 25,
    seconds: 40
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours -= 1;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isModalOpen]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <>
      {/* Sidebar Trigger Button */}
      <div
        className='flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-900 text-sm relative'
        onClick={openModal}
      >
        <span className='w-5 text-center opacity-80'>🧮</span>
        <span>Legacy Delegation</span>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-7xl mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh]'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>

            {/* Header */}
            <h1 className='text-white text-4xl font-light mb-12 text-center'>
              Legacy Delegation Dashboard
            </h1>

            {/* Top Cards Row */}
            <div className='flex gap-6 mb-16 max-w-full overflow-x-auto'>
              {/* My Total Delegation */}
              <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  My Total Delegation
                </div>
                <div className='text-white text-2xl font-light'>0 xEGLD</div>
              </div>

              {/* My Active Delegation */}
              <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
                <div className='text-gray-400 text-sm mb-3 text-center'>
                  My Active Delegation
                </div>
                <div className='text-white text-2xl font-light mb-2'>
                  0 xEGLD
                </div>
                <div className='text-gray-400 text-xs mb-4'>Up to N/A APY</div>
                <button className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2 rounded-lg text-sm transition-colors duration-200'>
                  Delegate Now
                </button>
              </div>

              {/* My Waiting List Delegation */}
              <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
                <div className='text-gray-400 text-sm mb-3 text-center'>
                  My Waiting List Delegation
                </div>
                <div className='text-white text-2xl font-light mb-2'>
                  0 xEGLD
                </div>
                <div className='text-gray-400 text-xs flex items-center gap-1'>
                  0% APY
                  <span className='w-3 h-3 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs'>
                    ?
                  </span>
                </div>
              </div>

              {/* My Claimable Rewards */}
              <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  My Claimable Rewards
                </div>
                <div className='text-white text-2xl font-light'>0 xEGLD</div>
              </div>

              {/* Next Rewards Batch In */}
              <div className='bg-zinc-800 rounded-2xl p-6 min-w-[280px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  Next Rewards Batch In
                </div>

                {/* Countdown Timer */}
                <div className='flex items-center gap-3'>
                  <div className='text-center'>
                    <div className='text-cyan-400 text-3xl font-light'>
                      {formatTime(timeLeft.hours)}
                    </div>
                    <div className='text-gray-400 text-xs'>hours</div>
                  </div>

                  <div className='text-cyan-400 text-2xl font-light'>:</div>

                  <div className='text-center'>
                    <div className='text-cyan-400 text-3xl font-light'>
                      {formatTime(timeLeft.minutes)}
                    </div>
                    <div className='text-gray-400 text-xs'>minutes</div>
                  </div>

                  <div className='text-cyan-400 text-2xl font-light'>:</div>

                  <div className='text-center'>
                    <div className='text-cyan-400 text-3xl font-light'>
                      {formatTime(timeLeft.seconds)}
                    </div>
                    <div className='text-gray-400 text-xs'>seconds</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Overview Section */}
            <h2 className='text-gray-400 text-3xl font-light mb-8'>
              Network Overview
            </h2>

            {/* Bottom Cards Row */}
            <div className='flex gap-6 max-w-full'>
              {/* Total Delegated */}
              <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  Total Delegated
                </div>
                <div className='text-white text-3xl font-light'>
                  555,000 xEGLD
                </div>
              </div>

              {/* Active Delegation */}
              <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  Active Delegation
                </div>
                <div className='text-white text-3xl font-light'>
                  555,000 xEGLD
                </div>
              </div>

              {/* Waiting List Delegation */}
              <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
                <div className='text-gray-400 text-sm mb-4 text-center'>
                  Waiting List Delegation
                </div>
                <div className='text-white text-3xl font-light'>0 xEGLD</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LegacyDelegationDashboard;

// import { useState, useEffect } from 'react';

// const LegacyDelegationDashboard = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 3,
//     minutes: 25,
//     seconds: 40
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
//         Legacy Delegation Dashboard
//       </h1>

//       {/* Top Cards Row */}
//       <div className='flex gap-6 mb-16 max-w-full overflow-x-auto'>
//         {/* My Total Delegation */}
//         <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             My Total Delegation
//           </div>
//           <div className='text-white text-2xl font-light'>0 xEGLD</div>
//         </div>

//         {/* My Active Delegation */}
//         <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
//           <div className='text-gray-400 text-sm mb-3 text-center'>
//             My Active Delegation
//           </div>
//           <div className='text-white text-2xl font-light mb-2'>0 xEGLD</div>
//           <div className='text-gray-400 text-xs mb-4'>Up to N/A APY</div>
//           <button className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-6 py-2 rounded-lg text-sm transition-colors duration-200'>
//             Delegate Now
//           </button>
//         </div>

//         {/* My Waiting List Delegation */}
//         <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
//           <div className='text-gray-400 text-sm mb-3 text-center'>
//             My Waiting List Delegation
//           </div>
//           <div className='text-white text-2xl font-light mb-2'>0 xEGLD</div>
//           <div className='text-gray-400 text-xs flex items-center gap-1'>
//             0% APY
//             <span className='w-3 h-3 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs'>
//               ?
//             </span>
//           </div>
//         </div>

//         {/* My Claimable Rewards */}
//         <div className='bg-zinc-800 rounded-2xl p-6 min-w-[240px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             My Claimable Rewards
//           </div>
//           <div className='text-white text-2xl font-light'>0 xEGLD</div>
//         </div>

//         {/* Next Rewards Batch In */}
//         <div className='bg-zinc-800 rounded-2xl p-6 min-w-[280px] flex-shrink-0 flex flex-col justify-center items-center min-h-[160px]'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             Next Rewards Batch In
//           </div>

//           {/* Countdown Timer */}
//           <div className='flex items-center gap-3'>
//             <div className='text-center'>
//               <div className='text-cyan-400 text-3xl font-light'>
//                 {formatTime(timeLeft.hours)}
//               </div>
//               <div className='text-gray-400 text-xs'>hours</div>
//             </div>

//             <div className='text-cyan-400 text-2xl font-light'>:</div>

//             <div className='text-center'>
//               <div className='text-cyan-400 text-3xl font-light'>
//                 {formatTime(timeLeft.minutes)}
//               </div>
//               <div className='text-gray-400 text-xs'>minutes</div>
//             </div>

//             <div className='text-cyan-400 text-2xl font-light'>:</div>

//             <div className='text-center'>
//               <div className='text-cyan-400 text-3xl font-light'>
//                 {formatTime(timeLeft.seconds)}
//               </div>
//               <div className='text-gray-400 text-xs'>seconds</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Network Overview Section */}
//       <h2 className='text-gray-400 text-3xl font-light mb-8'>
//         Network Overview
//       </h2>

//       {/* Bottom Cards Row */}
//       <div className='flex gap-6 max-w-full'>
//         {/* Total Delegated */}
//         <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             Total Delegated
//           </div>
//           <div className='text-white text-3xl font-light'>555,000 xEGLD</div>
//         </div>

//         {/* Active Delegation */}
//         <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             Active Delegation
//           </div>
//           <div className='text-white text-3xl font-light'>555,000 xEGLD</div>
//         </div>

//         {/* Waiting List Delegation */}
//         <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[160px] flex flex-col justify-center items-center'>
//           <div className='text-gray-400 text-sm mb-4 text-center'>
//             Waiting List Delegation
//           </div>
//           <div className='text-white text-3xl font-light'>0 xEGLD</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegacyDelegationDashboard;
