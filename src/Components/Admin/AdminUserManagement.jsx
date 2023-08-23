import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Layout/AdminSidebar';
import Loading from '../Layout/Loading';
import api from '../../api/axiosConfig';

function AdminUserManagement() {
  const [userProfiles, setUserProfiles] = useState([])
  const [freelancerProfiles, setFreelancerProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockUnblock, setBlockUnblock] = useState(true)

  useEffect(() => {
    async function fetchFreelancerProfiles() {
      try {
        const response = await api.get('/freelancers/freelancer-profiles/');
        setFreelancerProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchFreelancerProfiles();


    async function fetchUserProfiles() {
      try {
        const response = await api.get('/users/user-profiles/');
        setUserProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchUserProfiles();
  }, []);


  const handleBlockUnblock = (userId) => {
    api.post(`/admin/block-unblock-user/${userId}/`)
      .then((response) => {
        console.log('Block/Unblock response:', response);
        {blockUnblock? setBlockUnblock(false) : setBlockUnblock(true)}
      })
      .catch((error) => {
        console.error('Error blocking/unblocking user:', error);
      });
  };  
  
  return (
    <div>
      <AdminSidebar />

      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden class="text-2xl text-black font-medium lg:block">User Management</h5>
            <button class="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex space-x-4">
              <div hidden class="md:block">
                <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
        <div class="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                      <tr>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">User</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">First Name</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Last Name</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Email Address</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Phone Number</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">is_verified</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Edit</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {userProfiles.map((profile) => (
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
                              <button onClick={() => handleBlockUnblock(profile.user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2">
                                {blockUnblock ? <>Block</> : <>UnBloack</>}
                              </button>

                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
          </div>
        )}
        </div>

        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] mt-52">
        <div class="sticky z-10 top-0 h-16 border-b-2 border-t-2 bg-white lg:py-2.5">
          <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden class="text-2xl text-black font-medium lg:block">Freelancer Management</h5>
            <button class="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex space-x-4">
              <div hidden class="md:block">
                <div class="relative flex items-center text-gray-400 focus-within:text-cyan-500">
                  <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-400">
                    <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-400 focus:border-cyan-500 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
        <div class="px-6 pt-6 2xl:container mx-auto max-w-[your-width] overflow-x-auto">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-white">
                      <tr>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Freelancer</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Date of Birth</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Level</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Year of Experience</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Country</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">is_verified</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Edit</span>
                          </th>
                          <th scope="col" class="px-6 py-3 md:px-3">
                              <span class="hidden md:block">Status</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {freelancerProfiles.map((profile) => (
                          <tr
                              key={profile.id}
                              className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                              <td className="flex px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <img
                                      src={process.env.REACT_APP_API_BASE_URL + profile.profile_photo}
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
                              <td className="px-3 py-2 md:px-6 md:py-4">
                                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2">
                                      {profile.freelancer.is_active ? <>Block</> : <>UnBloack</>}
                                  </a>
                              </td>
                              <td className="px-3 py-2 md:px-6 md:py-4">
                                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:ml-2">
                                      Status
                                  </a>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
        )}
      </div>
    </div>

  )
}

export default AdminUserManagement