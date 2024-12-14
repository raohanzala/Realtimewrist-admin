// import React from 'react';
// import { Routes, Route, Outlet } from 'react-router-dom';
// import SideBar from '../components/SideBar';
// import AddProduct from '../components/AddProduct';
// import ListProduct from '../components/ListProduct';
// import Orders from '../components/Orders';

// const Admin = ({token}) => {
//   console.log('Amin token', token)
//   return (
//     <div className="flex bg-gray-100">

//       <SideBar />
      
//       <div className='p-5'>
//         <Routes>
//           <Route path="addproduct" element={<AddProduct  token={token} />} />
//           <Route path="listproduct" element={<ListProduct token={token} />} />
//           <Route path="orders" element={<Orders token={token} />} />
//           <Route path="/" element={<AddProduct token={token} />} /> {/* Default route */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Admin;
