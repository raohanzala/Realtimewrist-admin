import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast';
import Logo from './Logo';
import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();


  const handleLogin = async () => {

    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      console.log(response, 'asdf')
      if (response.data.success) {
        login(response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-lg">
        <img
          src={''}
          alt="Logo"
          className="w-[50%] m-auto"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Dashboard</h2>
        <p className="text-center text-gray-600">Sign in to your admin account</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-primary focus:ring-2 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-sm  focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-2 text-white bg-[#232323] rounded-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login