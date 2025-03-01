import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import SearchSortBar from "../components/SearchSortBar";
import { IoMdMore, IoMdPerson, IoMdTrash } from "react-icons/io";
import { timestampToShortDate } from "../helpers";
import { useUsers } from "../features/useUsers";
import Empty from "../components/Empty";
import Modal from "../components/Modal";
import FormRowVerticle from "../components/FormRowVerticle";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import UserPopup from "../components/UserPopup";
import PopupMenu from "../components/PopupMenu";
import { useDeleteUser } from "../features/useDeleteUser";
import UserDetails from "../components/userDetails";

const Users = () => {
  const [isProfilePopup, setProfilePopup] = useState(false);
  const [isProfileModal, setProfileModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [seletedUser, setSelectedUser] = useState(null);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {  deleteUser } = useDeleteUser();

  const { setPageTitle } = useContext(ShopContext);

  const { users, isLoading } = useUsers();

  const handleProfilePopup = (e) => {
    // e.stopPropagation();

    setProfilePopup((prevState) => !prevState);
  };
  const handleProfileModal = (e) => {
    // e.stopPropagation();
    setProfileModal((prevState) => !prevState);
    setProfilePopup(false);
  };
  const handleDeleteUser = (e) => {
    e.stopPropagation();
    setProfilePopup(false);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (seletedUser) {
      deleteUser(seletedUser._id)
      setProductToDelete(null);
      setIsConfirmModal(false);
    }
  };

  const handleDropdownToggle = useCallback((productId) => {
    setActiveDropdown((prev) => (prev === productId ? null : productId));
  }, []);

  useEffect(() => {
    setPageTitle("Users");
  }, [setPageTitle]);

  return (
    <div>
      <SearchSortBar
        placeholder="Search user"
        sortOptions={["recent", "date"]}
        filterOptions={["recent", "date"]}
      />

      <div className="grid gap-5 grid-cols-4 py-8">
        {isLoading ? (
          <SkeletonRow />
        ) : users?.length > 0 ? (
          users?.map((user) => (
            <div className="rounded-md border overflow-hidden relative" key={user._id}>
              <div
                className={`absolute top-1 right-1 text-gray-500 rounded py-1 ${
                  isProfilePopup ? "bg-gray-50" : ""
                }`}
                onClick={() => handleProfilePopup(user)}
              >
                <IoMdMore
                  className="text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownToggle(user?._id);
                    setSelectedUser(user);
                  }}
                />
                {activeDropdown === user?._id && (
                  <PopupMenu
                    actions={[
                      {
                        label: "View Profile",
                        onClick: handleProfileModal,
                        icon: <MdRemoveRedEye />,
                      },
                      {
                        label: "Delete User",
                        onClick: handleDeleteClick,
                        icon: <IoMdTrash />,
                      },
                    ]}
                    position={{ top: "20px", right: "0px" }}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </div>

              {user?.cartData?.length > 0 && <div className='bg-primary-1 py-1 px-2 text-white z-10 absolute text-xs top-0 left-0'>{user?.cartData?.length}</div>}
              <div className="bg-gray-100 py-4">
                <IoMdPerson className="text-5xl text-white m-auto" />
              </div>
              <div className="bg-white text-center py-3 px-2">
                <h2>{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="flex justify-between text-xs text-gray-500 mt-3">
                  <p>Orders#2</p>
                  <p>{timestampToShortDate(user.date)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4">
            <Empty resourceName="users" />
          </div>
        )}
      </div>

      <Modal
        isOpen={isConfirmModal}
        title="Delete User"
        onClose={() => setIsConfirmModal(false)}
      >
        <ConfirmationModal
          message={<>
            Are you sure you want to delete the <span className="font-semibold">{seletedUser?.name}</span>?
          </>
          }      
          confirmText={"Delete"}
          cancelText={"Cancel"}
          onConfirm={handleConfirmDelete}
          onCancel={null}
          onClose={() => setIsConfirmModal(false)}
        />
      </Modal>

      <Modal
        isOpen={isProfileModal}
        title={"User Details"}
        onClose={() => setProfileModal(false)}
      >
        <UserDetails user={seletedUser} setProfileModal={setProfileModal} />
      </Modal>
    </div>
  );
};

const SkeletonRow = () => {
  const skeletons = Array(8).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="animate-pulse border rounded-md">
          <div className="w-full h-28 bg-gray-200"></div>

          <div className="py-4 bg-white">
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-2 m-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-2/4 m-auto"></div>
            <div className="flex justify-between text-xs text-gray-500 mt-3 px-2">
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users;
