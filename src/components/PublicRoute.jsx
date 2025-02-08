import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  // const { token } = useContext(ShopContext);
  const {token} = useSelector((state)=> state.auth)
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
