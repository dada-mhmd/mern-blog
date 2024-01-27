import { Button } from 'flowbite-react';

const CTA = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 flex flex-col justify-center'>
        <h2 className='text-2xl'>Want to learn more about HTML?</h2>
        <p className='text-gray-500 my-2'>Check out these resources</p>
        <Button
          gradientDuoTone={'purpleToPink'}
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://freecodecamp.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn More
          </a>
        </Button>
      </div>
      <div className='flex-1'>
        <img src='https://i.ytimg.com/vi/ok-plXXHlWw/sddefault.jpg' alt='' />
      </div>
    </div>
  );
};

export default CTA;
