import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/PrivateRouteAdmin';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='min-h-screen'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />

          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          {/* admin private routes */}
          <Route element={<AdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
          </Route>

          <Route path='/projects' element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
