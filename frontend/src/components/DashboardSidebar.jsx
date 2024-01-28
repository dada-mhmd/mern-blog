import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { toast } from 'react-toastify';

import { logoutSuccess } from '../redux/user/userSlice';

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const { search } = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [search]);

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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              as='div'
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser?.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser?.isAdmin && (
            <>
              <Link to={'/dashboard?tab=posts'}>
                <Sidebar.Item
                  as='div'
                  active={tab === 'posts'}
                  icon={HiDocumentText}
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to={'/dashboard?tab=users'}>
                <Sidebar.Item
                  as='div'
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            onClick={handleLogout}
            icon={HiArrowSmRight}
            className='cursor-pointer'
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
