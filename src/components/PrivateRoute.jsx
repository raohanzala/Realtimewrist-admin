import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';

const PrivateRoute = () => {
  const { token } = useContext(ShopContext);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
