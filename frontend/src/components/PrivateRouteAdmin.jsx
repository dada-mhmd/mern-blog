import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default AdminPrivateRoute;
