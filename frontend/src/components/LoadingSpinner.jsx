import { Spinner } from 'flowbite-react';

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size={'xl'} />
    </div>
  );
};

export default LoadingSpinner;
