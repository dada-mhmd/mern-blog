import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';
import DashboardPosts from '../components/DashboardPosts';
import DashboardUsers from '../components/DashboardUsers';
import DashboardComments from '../components/DashboardComments';
import DashboardComp from '../components/DashboardComp';

const Dashboard = () => {
  const { search } = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* sidebar */}
        <DashboardSidebar />
      </div>

      {/* profile */}
      {tab === 'profile' && <DashboardProfile />}

      {/* posts */}
      {tab === 'posts' && <DashboardPosts />}

      {/* users */}
      {tab === 'users' && <DashboardUsers />}

      {/* comments */}
      {tab === 'comments' && <DashboardComments />}

      {/* dashboard */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
};

export default Dashboard;
