import CTA from './../components/CTA';
const Project = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-gray-500'>
        Build fun and interesting projects while learning web development
      </p>
      <CTA />
    </div>
  );
};

export default Project;
