import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig'
import UserEditProfileModal from './UserEditProfileModal';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersData, setOrdersData] = useState(null);

  const authToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch profile data
    api
      .get('/users/user-profile/')
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });

    // Fetch orders data
    api
    .get('/users/user-orderslist/')
    .then((response) => {
      setOrdersData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching order data:', error);
    });
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const updateProfileDataInParent = (newProfileData) => {
      setProfileData(newProfileData);
    };

  return (
    <div>
      <div className="h-full bg-gray-200 p-8">
      {profileData && (
        <>
        <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img src={process.env.REACT_APP_API_BASE_URL + profileData.profile_photo} className="w-40 h-40 border-4 border-white rounded-full object-cover" />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{user.username}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                </span>
              </div>
              <p className="text-gray-700">{user.email} | {user.phone_number}</p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2" onClick={openModal}>
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Edit Profile</span>
                </button>
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Message</span>
                </button>
              </div>
            </div>
        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">{user.first_name} {user.last_name}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Birthday:</span>
                  <span className="text-gray-700">{profileData.date_of_birth}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-gray-700">{user.phone_number}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{user.email}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">State:</span>
                  <span className="text-gray-700">{profileData.state}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Country:</span>
                  <span className="text-gray-700">{profileData.country}</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <h4 className="text-xl text-gray-900 font-bold">Orders</h4>
              <div className="relative px-4 mt-4">
                {Array.isArray(ordersData) && ordersData.length > 0 ? (
                  ordersData.map((order) => {
                    if (order.status !== "Canceled") {
                      return (
                        <div className="mb-6" key={order.id}>
                          <Link to={`/orderstatus/${order.id}`}>
                            <div className="flex items-center sm:flex-nowrap flex-wrap">
                              <div className="rounded-lg overflow-hidden w-52 h-32">
                                <img
                                  src={process.env.REACT_APP_API_BASE_URL + order.gig.image1}
                                  alt="order-image"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-gray-600 font-semibold text-lg">
                                      {order.gig.title}
                                    </span>
                                    <p className="text-gray-600 font-semibold text-lg">
                                      Freelancer: {order.freelancer.first_name}
                                    </p>
                                    <p
                                      className={`font-semibold text-lg ${
                                        order.status === "Pending"
                                          ? "text-blue-500"
                                          : order.status === "Rejected" ||
                                            order.status === "Payment Pending"
                                          ? "text-green-500"
                                          : order.status === "Accepted" ||
                                            order.status === "Completed" ||
                                            order.status === "Work Started" ||
                                            order.status === "Deal Closed"
                                          ? "text-green-500"
                                          : ""
                                      }`}
                                    >
                                      Status: {order.status}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <img src="/images/2953962.jpg" alt="Image" className="sm:ml-14 sm:w-96 sm:h-96 sm:max-w-lg" />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">About</h4>
              <p className="mt-2 text-gray-700">{profileData.about}</p>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
                
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600">Total Revenue</span>
                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold">$8,141</span>
                        <div className="flex items-center ml-2 mb-1">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                          <span className="font-bold text-sm text-gray-500 ml-0.5">3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-green-600">New Orders</span>
                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                        <div className="flex items-center ml-2 mb-1">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                          <span className="font-bold text-sm text-gray-500 ml-0.5">5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-blue-600">New Connections</span>
                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                        <div className="flex items-center ml-2 mb-1">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                          <span className="font-bold text-sm text-gray-500 ml-0.5">7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <canvas id="verticalBarChart" style={{display: "block", boxSizing: "border-box", height: "414px", width: "828px", width: "1656", height: "828"}}></canvas>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
      <UserEditProfileModal isOpen={isModalOpen} closeModal={closeModal} updateProfileData={updateProfileDataInParent}/>
    </div>
  )
}

export default UserProfile