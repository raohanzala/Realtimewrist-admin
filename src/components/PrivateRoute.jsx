import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // const { token } = useContext(ShopContext);
  const {token} = useSelector((state)=> state.auth)
  console.log(token, 'TOKEN')
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
