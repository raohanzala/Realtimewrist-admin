import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Input from '../components/Input';
import Box from '../components/Box';
import Button from '../components/Button';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const {setPageTitle} = useContext(ShopContext)
  const handleImageChange = (e) => {


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

  useEffect(()=> {
    setPageTitle("Edit Profile")
  }, [])

  return (
    <div className='grid grid-cols-2'>

    <Box >
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mt-4">
          <div className="relative size-20">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full rounded object-cover border shadow-md"
              />
            ) : (
              <div className="w-full h-full rounded text-xs border border-gray-300 flex items-center justify-center">
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
            <div className='flex gap-3'>

            <div
              onClick={() => document.getElementById('image').click()}
              className="  border cursor-pointer py-2 px-4 text-sm rounded text-gray-400 transition duration-200"
            >
              Select Profile Image
            </div>
            <div
              onClick={() => document.getElementById('image').click()}
              className=" border cursor-pointer py-2 px-4 text-sm rounded text-[red] transition duration-200"
              >
              Remove Photo
              </div>
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
          <Button
            type="submit"
            // className="w-full bg-[#4ED493] text-white py-2 rounded-md hover:bg-[#4bc1b2] transition duration-200"
            variant='secondary'
            >
            Save Settings
          </Button>
        </div>
      </form>
    </Box>
              </div>
  );
};

export default Profile;
