import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';

const PublicRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
