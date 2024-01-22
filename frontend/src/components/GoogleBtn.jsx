import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const GoogleBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          googlePhotoUrl: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type='button'
      gradientDuoTone={'pinkToOrange'}
      outline
    >
      <AiFillGoogleCircle size={20} className='mr-1' />
      Continue with Google
    </Button>
  );
};

export default GoogleBtn;
