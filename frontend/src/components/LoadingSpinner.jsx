import { Spinner } from 'flowbite-react';

const LoadingSpinner = () => {
  return (
    <section className='flex justify-center items-center min-h-screen'>
      <Spinner size={'xl'} />
    </section>
  );
};

export default LoadingSpinner;
