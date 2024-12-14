import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {

    // const {setPageTitle} = useContext(ShopContext)

    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Image:', image);
  };

  // useEffect(()=> {
  //   setPageTitle("Settings")
  // }, [])

  return (
    <div className='grid grid-cols-2'>

    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mt-4">
          <div className="relative w-16 h-16">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full rounded-full object-cover border-2 border-[#4ED493] shadow-md"
              />
            ) : (
              <div className="w-full h-full rounded-full text-xs border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text">No Image</span>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-col">
            {/* <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label> */}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              onClick={() => document.getElementById('image').click()}
              className="bg-[#4ed4939f] text-white cursor-pointer py-2 px-4 text-sm rounded-md hover:bg-[#4bc1b2] transition duration-200"
            >
              Select New Image
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border py-2 px-2 mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4ED493] focus:border-[#4ED493] sm:text-sm"
              required
              />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border py-2 mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4ED493] focus:border-[#4ED493] sm:text-sm"
              required
              />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border py-2 px-2 mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4ED493] focus:border-[#4ED493] sm:text-sm"
              required
              />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border py-2 px-2 mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4ED493] focus:border-[#4ED493] sm:text-sm"
              required
              />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-[#4ED493] text-white py-2 rounded-md hover:bg-[#4bc1b2] transition duration-200"
            >
            Save Settings
          </button>
        </div>
      </form>
    </div>
              </div>
  );
};

export default Profile;
