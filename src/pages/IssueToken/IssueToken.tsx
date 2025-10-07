import { IssueTokenForm } from './components';

export const IssueToken = () => (
  <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
    <h2 className='text-2xl font-bold p-2 mb-2 text-center'>Issue Token</h2>
    <IssueTokenForm />
  </div>
);
