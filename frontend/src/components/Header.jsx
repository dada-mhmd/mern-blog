/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { logoutSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', { method: 'POST' });
      if (!res.ok) {
        toast.error('Something went wrong');
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Navbar className='border-b-2'>
      {/* logo */}
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'
      >
        <span className='text-white px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          Dada's
        </span>
        Blog
      </Link>
      {/* end logo */}

      {/* search form */}
      <form>
        <TextInput
          type='text'
          placeholder='Search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      {/* end search form */}

      {/* search btn in medium screens and below */}
      <Button className='w-12 h-10 lg:hidden' pill color='gray'>
        <AiOutlineSearch />
      </Button>
      {/* search btn in medium screens and below */}

      {/* toggle theme btn and hamburger btn */}
      <div className='flex items-center gap-2 md:order-2'>
        <Button
          onClick={() => dispatch(toggleTheme())}
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser?.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser?.username}</span>
              <span className='block font-medium text-sm truncate'>
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <Button outline gradientDuoTone='purpleToBlue'>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      {/* toggle theme btn and hamburger btn */}

      {/* collapse */}
      <Navbar.Collapse>
        <Navbar.Link active={pathname === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>

        <Navbar.Link active={pathname === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
