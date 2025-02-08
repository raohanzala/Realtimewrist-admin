import { useContext, useState } from "react";
import { FaBell, FaRegEdit } from "react-icons/fa";
import NotificationsPopup from "./NotificationsPopup";
import adminPhoto from "../assets/admin-photo.jpeg";
import { ShopContext } from "../contexts/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdOutlineDashboard } from "react-icons/md";
import { IoMdMore } from 'react-icons/io'

import { IoLogOutOutline } from "react-icons/io5";
import useNotifications from "../hooks/useNotifications";
import { useDispatch, useSelector } from "react-redux";
import ProfilePopup from "./ProfilePopup";
import PopupMenu from "./PopupMenu";
import { BiPencil } from "react-icons/bi";
import { logout } from "../store/slices/authSlice";

function Header() {
  const [isNotificationPopup, setNotificationPopup] = useState(false);
  const [isProfilePopup, setProfilePopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { pageTitle } = useContext(ShopContext);

  const { notifications } = useSelector((state) => state.notifications)

  const {
    isIncoming,
    setIsincoming,
  } = useNotifications(dispatch);

  const handleNotification = (e) => {
    e.stopPropagation();
    setNotificationPopup((prevState) => !prevState);
    setIsincoming(false);
  };
  const handleProfile = (e) => {
    e.stopPropagation();
    setProfilePopup((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  };

  return (
    <div className="flex w-full items-center justify-between px-5 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 text-[#919191]">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <MdArrowBack />
        </div>

        <h1 className="text-lg  ">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center space-x-2">
          <div className="size-11 overflow-hidden rounded-full ">
            <img
              src={adminPhoto}
              className="w-full h-full object-cover"
              alt="Admin Profile"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-gray-800 text-sm">Rao Hanzala</h2>
            <p className="text-xs text-gray-500">CEO & Founder</p>
          </div>
        </div>

        {/* <div className=" p-3 rounded  cursor-pointer">
          <Link to={'/edit-profile'}>
            <MdAccountCircle className="text-2xl text-gray-700"/>
          </Link>
        </div> */}

        <div className="relative">
          <div
            onClick={handleNotification}
            className="relative p-3 rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <FaBell className="text-lg text-gray-700" />
            {isIncoming && notifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-ping"></span>
            )}
            {notifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 text-[9px] flex justify-center items-center text-white h-4 w-4 rounded-full bg-red-500">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
        >
          <IoLogOutOutline className="text-lg ml-[2px]" />
        </div>

        <div className={` -ml-2 hover:bg-gray-100 rounded py-1 `} onClick={handleProfile}>
          <IoMdMore className="text-xl cursor-pointer " />
        </div>
      </div>

      {isNotificationPopup && (
        <NotificationsPopup
          notifications={notifications}
          setNotificationPopup={setNotificationPopup}
        />
      )}
      {/* {isProfilePopup && (
       <ProfilePopup setProfilePopup={setProfilePopup}/>
      )} */}

      {isProfilePopup && 
        <PopupMenu actions={[
          { label: "Edit Product", onClick: () => null, icon: <BiPencil /> },
          { label: "Edit Profile", onClick: () => navigate(`/edit-profile`), icon:<FaRegEdit size={16} /> },
          { label: "Dashboard", onClick: () => navigate(`/`), icon: <MdOutlineDashboard size={18}/>  },
        ]}
        position={{ top: '65px', right: 2 }}
        onClose={()=> setProfilePopup(false)}
        />
      }
    </div>
  );
}

export default Header;
