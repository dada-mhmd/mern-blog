/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';
import GoogleBtn from '../components/GoogleBtn';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill in all fields'));
    }
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            You can sign in with your email or google account
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='p-2'>Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>

            <GoogleBtn />
          </form>

          <div className='flex gap-1 mt-4 text-sm'>
            <span>Don't have an account?</span>
            <Link className='text-blue-500 font-medium underline' to='/sign-up'>
              Register
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

export default Login;
