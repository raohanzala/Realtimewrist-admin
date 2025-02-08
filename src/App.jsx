import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
// import "leaflet/dist/leaflet.css";


import { Suspense } from 'react';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import AddProduct from './components/AddProduct';
import Notifications from './pages/Notifications';
import LoadingLogo from './components/LoadingLogo';
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/Users';
import PageNotFound from './components/PageNotFound';
import { OrderDetail } from './components/OrderDetail';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Loader from './components/Loader';
import StoreCustomization from './pages/StoreCustomization';
import Product from './pages/Product';
import EditProfile from './pages/Profile';
import Profile from './components/Profile';
import CategoryTable from './components/CategoryTable';
import useScrollRestoration from './hooks/useScrollRestoration';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  useScrollRestoration()

  return (
    <div className=' bg-[#f9fafb]'>
      {
        <AppLayout>
          <Suspense fallback={<Loader />}>
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
                <Route path="/list" element={< Products/>} />
                <Route path='/product/:productId' element={<Product />} />
                <Route path="/orders" element={< Orders />} />
                <Route path="/order/:orderId" element={< OrderDetail />} />
                <Route path="/users" element={< Users />} />
                <Route path="/notifications" element={< Notifications />} />
                <Route path="/store" element={< Notifications />} />
                <Route path="/profile" element={< Profile />} />
                <Route path="/category" element={< CategoryTable />} />
                <Route path="/settings" element={< Settings />} />
                <Route path="/online-store/customization" element={< StoreCustomization />} />
                <Route path="/edit-profile" element={< EditProfile />} />
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