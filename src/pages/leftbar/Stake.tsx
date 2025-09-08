import { useState, useEffect } from 'react';

const StakingDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 30,
    seconds: 16
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
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>

            {/* Header */}
            <h1 className='text-white text-4xl font-light mb-12 text-center'>
              Staking Dashboard
            </h1>

            {/* Cards Container */}
            <div className='flex flex-col md:flex-row gap-8'>
              {/* My Stake Card */}
              <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                <div className='text-gray-400 text-lg mb-4 text-center'>
                  My Stake
                </div>
                <div className='text-white text-3xl font-light'>0 xEGLD</div>
              </div>

              {/* My Claimable Rewards Card */}
              <div className='bg-green-500 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                <div className='text-black text-lg mb-4 text-center font-medium'>
                  My Claimable Rewards
                </div>
                <div className='text-black text-3xl font-light'>0 xEGLD</div>
              </div>

              {/* Next Rewards Batch Card */}
              <div className='bg-zinc-800 rounded-2xl p-8 flex-1 min-h-[200px] flex flex-col justify-center items-center'>
                <div className='text-gray-400 text-lg mb-6 text-center'>
                  Next Rewards Batch In
                </div>

                {/* Countdown Timer */}
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

                {/* Stake Now Button */}
                <button className='bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200'>
                  Stake Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StakingDashboard;

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
