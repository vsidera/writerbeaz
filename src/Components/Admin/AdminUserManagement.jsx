import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Layout/AdminSidebar';
import Loading from '../Layout/Loading';
import BlockUnblockModal from '../Layout/BlockUnblockModal';
import api from '../../api/axiosConfig';

function AdminUserManagement() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [tutorProfiles, setTutorProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [blockAction, setBlockAction] = useState(true);
  const [acceptedTutors, setAcceptedTutors] = useState([]);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [tutorSearchInput, setTutorSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await api.get('/users/user-profiles/');
        const tutorResponse = await api.get('/tutors/tutor-profiles/');

        setUserProfiles(userResponse.data);
        setTutorProfiles(tutorResponse.data);
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
      : `/admin/block-unblock-tutor/${userId}/`;
  
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
          setTutorProfiles((prevState) =>
            prevState.map((profile) =>
              profile.tutor.id === userId
                ? { ...profile, tutor: { ...profile.tutor, is_active: newStatus } }
                : profile
            )
          );
        }
  
        closeUserModal();
        closeTutorModal();
  
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

  const openTutorModal = (tutorId, blockAction) => {
    setSelectedTutorId(tutorId);
    setBlockAction(blockAction);
    setIsTutorModalOpen(true);
  };
  
  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const closeTutorModal = () => {
    setIsTutorModalOpen(false);
  };

  const handleAcceptTutor = (tutorId) => {
    const endpoint = `/admin/register-tutor/${tutorId}/`;

    api
      .post(endpoint)
      .then((response) => {
        console.log('Tutor registration response:', response);

        setAcceptedTutors((prevAcceptedTutors) => [
          ...prevAcceptedTutors,
          tutorId,
        ]);
      })
      .catch((error) => {
        console.error('Error registering tutor:', error);
      });
  };

  const filteredUserProfiles = userProfiles.filter((profile) =>
    profile.user.username.toLowerCase().includes(userSearchInput.toLowerCase()) ||
    profile.user.email.toLowerCase().includes(userSearchInput.toLowerCase())
  );

  const filteredTutorProfiles = tutorProfiles.filter((profile) =>
    profile.tutor.username.toLowerCase().includes(tutorSearchInput.toLowerCase()) ||
    profile.tutor.email.toLowerCase().includes(tutorSearchInput.toLowerCase())
  );

  const handleUserSearchChange = (event) => {
    setUserSearchInput(event.target.value);
  };

  const handleTutorSearchChange = (event) => {
    setTutorSearchInput(event.target.value);
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

      {/* Tutor Management */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] mt-52">
        <div className="top-0 h-16 border-b-2 border-t-2 bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="text-2xl text-black font-medium lg:block">Tutor Management</h5>
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
                    name="tutorSearchInput"
                    id="tutorSearchInput"
                    placeholder="Search here"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                    value={tutorSearchInput}
                    onChange={handleTutorSearchChange}
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
                      <span className="hidden md:block">Tutor</span>
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
                  {filteredTutorProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="flex px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          src={profile.profile_photo}
                          className="w-24 h-24 rounded-full border border-white mr-3"
                          alt={profile.tutor.username}
                        />
                        <div className='mt-5 overflow-hidden'>
                          <p className="truncate">{profile.tutor.username}</p>
                          <p className="truncate">{profile.tutor.email}</p>
                          <p className="truncate">{profile.tutor.phone_number}</p>
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
                        {profile.tutor.is_verified ? <p>Verified</p> : <p>Not Verified</p>}
                      </td>
                      <td>
                      <button
                        onClick={() => openTutorModal(profile.tutor.id, profile.tutor.is_active)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2"
                      >
                        {profile.tutor.is_active ? <>Block</> : <>Unblock</>}
                      </button>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4">
                        {profile.is_registered ? (
                          <p className="text-green-500">Accepted</p>
                        ) : (
                          <button
                            onClick={() => handleAcceptTutor(profile.tutor.id)}
                            className={`font-medium ${
                              acceptedTutors.includes(profile.tutor.id)
                                ? "text-green-500"
                                : "text-blue-600 dark:text-blue-500 hover:underline"
                            } md:ml-2`}
                            disabled={acceptedTutors.includes(profile.tutor.id)}
                          >
                            {acceptedTutors.includes(profile.tutor.id)
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

      {/* Tutor Block/Unblock Modal */}
      <BlockUnblockModal
        isOpen={isTutorModalOpen}
        onRequestClose={closeTutorModal}
        onConfirm={() => handleBlockUnblock(selectedTutorId, false)}
      />
    </div>
  );
}

export default AdminUserManagement;
