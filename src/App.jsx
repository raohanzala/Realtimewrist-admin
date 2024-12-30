import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

import { Suspense } from 'react';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AddProduct from './components/AddProduct';
import Notifications from './pages/Notifications';
import LoadingLogo from './components/LoadingLogo';
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/Users';
import ListProductTable from './components/ListProductTable';
import PageNotFound from './components/PageNotFound';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  return (
    <div className=' bg-[#f9fafb]'>
      {
        <AppLayout>
          <Suspense fallback={<LoadingLogo />}>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={< AddProduct />} />
                <Route path="/list" element={< ListProductTable/>} />
                <Route path="/orders" element={< Orders />} />
                <Route path="/users" element={< Users />} />
                <Route path="/notifications" element={< Notifications />} />
                <Route path="/profile" element={< Profile />} />
              </Route>
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </Suspense>
        </AppLayout>}

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '1px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',

          }
        }}
      />
    </div>
  );

}

export default App;
