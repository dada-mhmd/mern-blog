/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      } else {
        setIsLoading(false);
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='mt-20'>
      <div className='flex flex-col md:flex-row p-3 max-w-3xl mx-auto gap-5'>
        <div className='flex-1 sm:mt-10 mt-0'>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='text-white px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
              Dada's
            </span>
            Blog
          </Link>
          <p className='text-sm text-gray-500 font-medium mt-5'>
            You can sign up with your email or google account
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <Label value='Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className='p-2'>Loading...</span>
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>

          <div className='flex gap-1 mt-4 text-sm'>
            <span>Already have an account?</span>
            <Link className='text-blue-500 font-medium underline' to='/sign-in'>
              Login
            </Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
