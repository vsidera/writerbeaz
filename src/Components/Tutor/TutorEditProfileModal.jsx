import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    maxWidth: '50%',
    width: 'auto',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

function TutorEditProfileModal({ isOpen, closeModal, updateProfileData  }) {
  const authToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.user_id);

  const [profileData, setProfileData] = useState({
    level: '',
    title: '',
    about: '',
    date_of_birth: '',
    city: '',
    state: '',
    country: '',
    year_of_experience: '',
    age: '',
    profile_photo: null,
  });

  useEffect(() => {
    api
      .get(`/tutor/tutor-createprofile/${userId}/`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profile_photo: file });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('level', profileData.level);
    formData.append('title', profileData.title);
    formData.append('about', profileData.about);
    formData.append('date_of_birth', profileData.date_of_birth);
    formData.append('city', profileData.city);
    formData.append('state', profileData.state);
    formData.append('country', profileData.country);
    formData.append('year_of_experience', profileData.year_of_experience);
    formData.append('age', profileData.age);
    formData.append('profile_photo', profileData.profile_photo);

    try {
      const response = await api.put(
        `/tutor/tutor-createprofile/${userId}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        updateProfileData(response.data);
        toast.success('Profile Updated Successfully');
        closeModal();
      } else {
        toast.error('Error updating profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Profile Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
      className="fixed inset-0 flex items-center justify-center z-50"
      style={customStyles}
    >
      <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-medium text-gray-800">Edit Your Profile</h1>

          <button onClick={closeModal} className="text-gray-600 focus:outline-none hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">Edit your profile details by updating here:</p>

        <form className="mt-5">
            <div className="mb-4 flex">
                {/* User Level */}
                <div className="w-1/2 mr-2">
                    <label className="block text-sm text-gray-700 capitalize">User Level:</label>
                    <select
                    name="level"
                    value={profileData.level}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    >
                    <option value="fresher">Fresher</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="professional">Professional</option>
                    </select>
                </div>

                {/* Title */}
                <div className="w-1/2 ml-2">
                    <label className="block text-sm text-gray-700 capitalize">Title:</label>
                    <input
                    type="text"
                    name="title"
                    value={profileData.title}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>
            </div>

            {/* About */}
            <div className="mb-4">
                <label className="block text-sm text-gray-700 capitalize">About Me:</label>
                <textarea
                name="about"
                value={profileData.about}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
                <label className="block text-sm text-gray-700 capitalize">Date of Birth:</label>
                <input
                type="date"
                name="date_of_birth"
                value={profileData.date_of_birth}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
            </div>

            <div className="mb-4 flex">
                {/* City */}
                <div className="w-1/2 mr-2">
                    <label className="block text-sm text-gray-700 capitalize">City:</label>
                    <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>

                {/* State */}
                <div className="w-1/2 ml-2">
                    <label className="block text-sm text-gray-700 capitalize">State:</label>
                    <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="mb-4 flex">
                {/* Country */}
                <div className="w-1/2 mr-2">
                    <label className="block text-sm text-gray-700 capitalize">Country:</label>
                    <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>

                {/* Year of Experience */}
                <div className="w-1/2 ml-2">
                    <label className="block text-sm text-gray-700 capitalize">Years of Experience:</label>
                    <input
                    type="number"
                    name="year_of_experience"
                    value={profileData.year_of_experience}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="mb-4 flex">
                {/* Age */}
                <div className="w-1/2 mr-2">
                    <label className="block text-sm text-gray-700 capitalize">Age:</label>
                    <input
                    type="number"
                    name="age"
                    value={profileData.age}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>

                {/* Profile Photo */}
                <div className="w-1/2 ml-2">
                    <label className="block text-sm text-gray-700 capitalize">Profile Photo:</label>
                    <input
                    type="file"
                    name="profile_photo"
                    onChange={handleFileChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="mb-4">
                <button
                onClick={handleSubmit}
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mx-5"
                >
                Save Changes
                </button>
                <button
                onClick={closeModal}
                type="button"
                className="px-4 py-2 mt-0.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring focus:ring-gray-200"
                >
                Cancel
                </button>
            </div>
        </form>
      </div>
    </Modal>
  );
}

export default TutorEditProfileModal;
