import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Layout/AdminSidebar';
import Loading from '../Layout/Loading';
import BlockUnblockModal from '../Layout/BlockUnblockModal';
import api from '../../api/axiosConfig';

function AdminUserManagement() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [freelancerProfiles, setFreelancerProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isFreelancerModalOpen, setIsFreelancerModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(null);
  const [blockAction, setBlockAction] = useState(true);
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [freelancerSearchInput, setFreelancerSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await api.get('/users/user-profiles/');
        const freelancerResponse = await api.get('/freelancers/freelancer-profiles/');

        setUserProfiles(userResponse.data);
        setFreelancerProfiles(freelancerResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleBlockUnblock = (userId, isUser) => {
    const newStatus = isUser ? !blockAction : !blockAction;
    const endpoint = isUser
      ? `/admin/block-unblock-user/${userId}/`
      : `/admin/block-unblock-freelancer/${userId}/`;
  
    api
      .post(endpoint, { is_active: newStatus })
      .then((response) => {
        console.log('Block/Unblock response:', response);
  
        if (isUser) {
          setUserProfiles((prevState) =>
            prevState.map((profile) =>
              profile.user.id === userId
                ? { ...profile, user: { ...profile.user, is_active: newStatus } }
                : profile
            )
          );
        } else {
          setFreelancerProfiles((prevState) =>
            prevState.map((profile) =>
              profile.freelancer.id === userId
                ? { ...profile, freelancer: { ...profile.freelancer, is_active: newStatus } }
                : profile
            )
          );
        }
  
        closeUserModal();
        closeFreelancerModal();
  
        setBlockAction(newStatus);
      })
      .catch((error) => {
        console.error('Error blocking/unblocking:', error);
      });
  };
  

  const openUserModal = (userId, blockAction) => {
    setSelectedUserId(userId);
    setBlockAction(blockAction);
    setIsUserModalOpen(true);
  };

  const openFreelancerModal = (freelancerId, blockAction) => {
    setSelectedFreelancerId(freelancerId);
    setBlockAction(blockAction);
    setIsFreelancerModalOpen(true);
  };
  
  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const closeFreelancerModal = () => {
    setIsFreelancerModalOpen(false);
  };

  const handleAcceptFreelancer = (freelancerId) => {
    const endpoint = `/admin/register-freelancer/${freelancerId}/`;

    api
      .post(endpoint)
      .then((response) => {
        console.log('Freelancer registration response:', response);

        setAcceptedFreelancers((prevAcceptedFreelancers) => [
          ...prevAcceptedFreelancers,
          freelancerId,
        ]);
      })
      .catch((error) => {
        console.error('Error registering freelancer:', error);
      });
  };

  const filteredUserProfiles = userProfiles.filter((profile) =>
    profile.user.username.toLowerCase().includes(userSearchInput.toLowerCase()) ||
    profile.user.email.toLowerCase().includes(userSearchInput.toLowerCase())
  );

  const filteredFreelancerProfiles = freelancerProfiles.filter((profile) =>
    profile.freelancer.username.toLowerCase().includes(freelancerSearchInput.toLowerCase()) ||
    profile.freelancer.email.toLowerCase().includes(freelancerSearchInput.toLowerCase())
  );

  const handleUserSearchChange = (event) => {
    setUserSearchInput(event.target.value);
  };

  const handleFreelancerSearchChange = (event) => {
    setFreelancerSearchInput(event.target.value);
  };

  return (
    <div>
      <AdminSidebar />

      {/* User Management */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-black font-medium lg:block">User Management</h5>
            <div className="flex space-x-4">
              <div className="md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="userSearchInput"
                    id="userSearchInput"
                    placeholder="Search here"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                    value={userSearchInput}
                    onChange={handleUserSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">User</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">First Name</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Last Name</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Email Address</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Phone Number</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">is_verified</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="flex px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {profile.user.username}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.first_name}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.last_name}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.email}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.phone_number}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.user.is_verified ? <p>Verified</p> : <p>Not Verified</p>}
                      </td>
                      <td>
                      <button
                        onClick={() => openUserModal(profile.user.id, profile.user.is_active)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                      >
                        {profile.user.is_active ? <>Block</> : <>Unblock</>}
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Freelancer Management */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] mt-52">
        <div className="top-0 h-16 border-b-2 border-t-2 bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-black font-medium lg:block">Freelancer Management</h5>
            <div className="flex space-x-4">
              <div className="md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-500">
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-400">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="freelancerSearchInput"
                    id="freelancerSearchInput"
                    placeholder="Search here"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                    value={freelancerSearchInput}
                    onChange={handleFreelancerSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Freelancer</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Date of Birth</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Level</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Year of Experience</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Country</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">is_verified</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Edit</span>
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-3">
                      <span className="hidden md:block">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFreelancerProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="flex px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          src={profile.profile_photo}
                          className="w-24 h-24 rounded-full border border-white mr-3"
                          alt={profile.freelancer.username}
                        />
                        <div className='mt-5 overflow-hidden'>
                          <p className="truncate">{profile.freelancer.username}</p>
                          <p className="truncate">{profile.freelancer.email}</p>
                          <p className="truncate">{profile.freelancer.phone_number}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.date_of_birth}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.level}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 text-center">
                        {profile.year_of_experience}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.country}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.freelancer.is_verified ? <p>Verified</p> : <p>Not Verified</p>}
                      </td>
                      <td>
                      <button
                        onClick={() => openFreelancerModal(profile.freelancer.id, profile.freelancer.is_active)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                      >
                        {profile.freelancer.is_active ? <>Block</> : <>Unblock</>}
                      </button>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.is_registered ? (
                          <p className="text-green-500">Accepted</p>
                        ) : (
                          <button
                            onClick={() => handleAcceptFreelancer(profile.freelancer.id)}
                            className={`font-medium ${
                              acceptedFreelancers.includes(profile.freelancer.id)
                                ? "text-green-500"
                                : "text-blue-600 dark:text-blue-500 hover:underline"
                            } md:ml-2`}
                            disabled={acceptedFreelancers.includes(profile.freelancer.id)}
                          >
                            {acceptedFreelancers.includes(profile.freelancer.id)
                              ? "Accepted"
                              : "Accept"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* User Block/Unblock Modal */}
      <BlockUnblockModal
        isOpen={isUserModalOpen}
        onRequestClose={closeUserModal}
        onConfirm={() => handleBlockUnblock(selectedUserId, true)}
      />

      {/* Freelancer Block/Unblock Modal */}
      <BlockUnblockModal
        isOpen={isFreelancerModalOpen}
        onRequestClose={closeFreelancerModal}
        onConfirm={() => handleBlockUnblock(selectedFreelancerId, false)}
      />
    </div>
  );
}

export default AdminUserManagement;
